import { CreateProductDto, Paginador } from "../domain/products.dto"
import { MongoProductsDatasource } from "./mongo.products.datasource"
import { ProductEntity, ProductsPaginated } from "../domain/products.entity"
import { ProductsRespository } from "../domain/products.domain.repository"
import { redis } from "../../../database/redis"
import { productKey } from "./redis.products.datasource"

export class MongoProductsRepository implements ProductsRespository {
	constructor(private readonly dataSource: MongoProductsDatasource) {}

	getAllProducts(parms: Paginador): Promise<ProductsPaginated> {
		return this.dataSource.getAllProducts(parms)
	}
	findProductById(id: string): Promise<ProductEntity | null> {
		return this.dataSource.findProductById(id)
	}
	createProduct(producDto: CreateProductDto): Promise<ProductEntity> {
		const userCreated = this.dataSource.createProduct(producDto)
		if(userCreated) {
			redis.del(productKey)
			return userCreated
		}

		return userCreated
	}
	updateProduct(
		id: string,
		productDto: Partial<CreateProductDto>
	): Promise<ProductEntity | null> {
		const updatedProduct = this.dataSource.updateProduct(id, productDto)
		if(updatedProduct) {
			redis.del(productKey)
			return updatedProduct
		}
		
		return updatedProduct
	}
	deleteProduct(id: string): Promise<boolean> {
		const deletedProduct = this.dataSource.deleteProduct(id)
		if(deletedProduct) {
			redis.del(productKey)
			return deletedProduct
		}	

		return deletedProduct
	}

	getSlug(parms: string): string {
		return parms
			?.replace(/[^a-zA-Z0-9 ]/g, "")
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-")
	}
}
