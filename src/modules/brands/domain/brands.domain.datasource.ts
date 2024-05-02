import { BrandsEntity } from "./brands.entity"
import { CreateBrandDto, UpdateBrandsDto } from "./brands.dto"

export abstract class BrandsDataSource {
	abstract getBrands(): Promise<Array<BrandsEntity>>
	abstract findBrandById(id: string): Promise<BrandsEntity | null>
	abstract createBrand(brand: CreateBrandDto): Promise<BrandsEntity>
	abstract updateBrand(id: string,brand: UpdateBrandsDto): Promise<BrandsEntity | null>
	abstract deleteBrand(id: string): Promise<boolean>
}
