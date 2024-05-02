import { BrandsRespository } from "../domain/brands.domain.repository"
import { DeleteBrandUseCase } from "../domain/brands.use-cases"

export class DeleteBrandUseCaseImpl implements DeleteBrandUseCase {
	constructor(private readonly repository: BrandsRespository) {}
    
	async exec(id: string): Promise<boolean> {
		return await this.repository.deleteBrand(id)
	}
}
