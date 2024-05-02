import {
	CreateProductDto,
	Paginador,
	UpdateProductDto
} from "../domain/products.dto"
import { ObjectId } from "mongodb"
import { ProductEntity, ProductsPaginated } from "../domain/products.entity"
import { ProductsDataSource } from "../domain/products.domain.datasource"
import { Product, ProductsEntity } from "./mongo.products.entity"
import { redis } from "../../../database/redis"
import { productKey } from './redis.products.datasource';

export class MongoProductsDatasource implements ProductsDataSource {
	async getAllProducts(parms: Paginador): Promise<ProductsPaginated> {
		const { limit, page , search , brand } = parms
		const query = {} as Record<string, unknown>
		
		const cacheKey = `getAllProducts:${limit}:${page}:${search}:${brand}`
		const cacheProducts = await redis.hGet(productKey,cacheKey);

		if (cacheProducts) {
			const cacheProductsPaginated =JSON.parse(cacheProducts)
			return cacheProductsPaginated
		}

		if (parms.search) {
			query.name = { $regex: search, $options: "i" }
		}

		if (parms.brand) {
			query["brand.name"] = { $regex: brand, $options: "i" }
		}

		const total = await (await ProductsEntity()).countDocuments(query)
		const totalPages = Math.ceil(total / limit)
		const skip = (page - 1) * limit
		const sort = parms.sort === "asc" ? 1 : -1

		const products = await (await ProductsEntity())
			.find(query)
			.sort({ createdAt: sort })
			.skip(skip)
			.limit(limit)
			.toArray()

		const productsMapped = products.map((product) => {
			const { _id, ...productMapped } = product
			return new ProductEntity({ id: _id.toString(), ...productMapped })
		})

		const productsPaginated: ProductsPaginated = {
			products: productsMapped,
			meta: {
				currentPage: page,
				totalPages,
				total,
				limit
			}
		}

		const timeExpiration = 60 * 60 *24 // 1 day 
		await redis.hSet(productKey,cacheKey,JSON.stringify(productsPaginated))
		await redis.expire(`${productKey}:${cacheKey}`, timeExpiration);

		return productsPaginated
	}

	async findProductById(id: string): Promise<ProductEntity | null> {
		const query = { _id: new ObjectId(id) }
		const foundProduct = await (await ProductsEntity()).findOne(query)

		if (foundProduct) {
			const { _id, ...product } = foundProduct
			return new ProductEntity({ id: _id.toString(), ...product })
		}

		return null
	}

	async createProduct(producDto: CreateProductDto): Promise<ProductEntity> {
		producDto.slug = this.getSlug(producDto.name)
		producDto.createdAt = new Date()
		producDto.updatedAt = new Date()
		const newProduct = await (await ProductsEntity()).insertOne(producDto)

		const id = newProduct.insertedId.toString()
		return new ProductEntity({ id, ...producDto })
	}

	async updateProduct(
		id: string,
		productDto: UpdateProductDto
	): Promise<ProductEntity | null> {
		const findProduct = await this.findProductById(id)

		if (findProduct) {
			const { id, brand, ...product } = findProduct
			const updateProduct: Product = {
				name: productDto?.name || product.name,
				slug: this.getSlug(productDto?.name || product.name),
				price: productDto?.price || product.price,
				brand: {
					id: productDto?.brand?.id || brand.id,
					name: productDto?.brand?.name || brand.name
				},
				createdAt: findProduct.createdAt,
				updatedAt: new Date()
			}

			const query = { _id: new ObjectId(id) }
			const document = { $set: updateProduct }
			const updatedProduct = await (
				await ProductsEntity()
			).updateOne(query, document)

			if (updatedProduct.modifiedCount > 0) {
				return new ProductEntity({ id, ...updateProduct })
			}

			throw Error(`The product with id ${id} was not modified`)
		}

		return null
	}

	async deleteProduct(id: string): Promise<boolean> {
		const foundProduct = await this.findProductById(id)
		const query = { _id: new ObjectId(id) }

		if (foundProduct) {
			const deletedProduct = await (await ProductsEntity()).deleteOne(query)
			return deletedProduct.deletedCount > 0
		}

		return false
	}

	private getSlug(parms: string): string {
		return parms
			.replace(/[^a-zA-Z0-9 ]/g, "")
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-")
	}
}
