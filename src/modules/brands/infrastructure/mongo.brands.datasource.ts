import { brandEntity } from "./mongo.brands.entity"
import { BrandsDataSource } from "../domain/brands.domain.datasource"
import { BrandsEntity } from "../domain/brands.entity"
import { CreateBrandDto, UpdateBrandsDto } from "../domain/brands.dto"
import { ObjectId } from "mongodb"

export class MongoBrandsDataSource implements BrandsDataSource {
	async getBrands(): Promise<Array<BrandsEntity>> {
		const allBrands = await (await brandEntity()).find({}).toArray()
		
		return allBrands.map((brand) => {
			return new BrandsEntity({
				id: brand._id.toString(),
				name: brand.name,
				slug: brand.slug
			})
		})
	}

	async findBrandById(id: string): Promise<BrandsEntity | null> {
		const query = { _id: new ObjectId(id) }
		const foundBrand = await (await brandEntity()).findOne(query)

		if (foundBrand) {
			return new BrandsEntity({
				id: foundBrand._id.toString(),
				name: foundBrand.name,
				slug: foundBrand.slug
			})
		}

		return null
	}

	async createBrand(brand: CreateBrandDto): Promise<BrandsEntity> {
		brand.slug = this.getSlug(brand.name)
		const query = brand
		const newBrand = await (await brandEntity()).insertOne(query)
		return new BrandsEntity({
			id: newBrand.insertedId.toString(),
			...brand
		})
	}

	async updateBrand(
		id: string,
		brand: UpdateBrandsDto
	): Promise<BrandsEntity | null> {
		const foundBrand = await this.findBrandById(id)

		if (foundBrand) {
			const query = { _id: new ObjectId(id) }
			const document = { $set: brand }

			brand.slug = this.getSlug(brand.name!)
			await (await brandEntity()).updateOne(query, document)

			return new BrandsEntity({
				id: id,
				name: brand?.name || foundBrand.name,
				slug: brand?.slug || foundBrand.slug
			})
		}

		return null
	}

	async deleteBrand(id: string): Promise<boolean> {
		const query = { _id: new ObjectId(id) }
		const deletedBrand = await (await brandEntity()).deleteOne(query)
		return deletedBrand.deletedCount > 0
	}

	private getSlug(parms: string): string {
		return parms
			?.replace(/[^a-zA-Z0-9 ]/g, "")
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-")
	}
}
