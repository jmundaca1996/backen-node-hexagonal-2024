import { BrandsEntity } from "../domain/brands.entity"
import { BrandsRespository } from "../domain/brands.domain.repository"
import { UpdateBrandsDto } from "../domain/brands.dto"
import { UpdateBrandUseCase } from "../domain/brands.use-cases"

export class UpdateBrandUseCaseImpl implements UpdateBrandUseCase {
	constructor(private readonly repository: BrandsRespository) {}
    
	async exec(id: string, brand: UpdateBrandsDto): Promise<BrandsEntity | null> {
		return await this.repository.updateBrand(id, brand)
	}
}
