import { CreateBrandDto } from "../domain/brands.dto"
import { BrandsEntity } from "../domain/brands.entity"
import { BrandsRespository } from "../domain/brands.domain.repository"
import { BrandsDataSource } from "../domain/brands.domain.datasource"

export class MongoBrandsRepository implements BrandsRespository {
	constructor(private readonly dataSource: BrandsDataSource) {}

	getBrands(): Promise<Array<BrandsEntity>> {
		return this.dataSource.getBrands()
	}

	findBrandById(id: string): Promise<BrandsEntity | null> {
		return this.dataSource.findBrandById(id)
	}

	async createBrand(brand: CreateBrandDto): Promise<BrandsEntity> {
		const newBrand = await this.dataSource.createBrand(brand)
		return newBrand
	}

	updateBrand(id: string,brand: Partial<CreateBrandDto>): Promise<BrandsEntity | null> {
		return this.dataSource.updateBrand(id, brand)
	}

	deleteBrand(id: string): Promise<boolean> {
		return this.dataSource.deleteBrand(id)
	}
}
