import { BrandsEntity } from "./brands.entity"
import { CreateBrandDto, UpdateBrandsDto } from "./brands.dto"

export interface getAllBrandsUseCase {
	exec(): Promise<Array<BrandsEntity>>
}

export interface FindBrandUseCase {
	exec(id: string): Promise<BrandsEntity | null>
}

export interface CreateBrandUseCase {
	exec(brand: CreateBrandDto): Promise<BrandsEntity>
}

export interface UpdateBrandUseCase {
	exec(id:string ,brand: UpdateBrandsDto): Promise<BrandsEntity | null>
}

export interface DeleteBrandUseCase {
	exec(id: string): Promise<boolean>
}
