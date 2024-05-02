import { FindBrandUseCase } from "./../domain/brands.use-cases"
import { BrandsRespository } from "../domain/brands.domain.repository"
import { BrandsEntity } from "../domain/brands.entity"

export class FindBrandUseCaseImpl implements FindBrandUseCase {
	constructor(private readonly repository: BrandsRespository) {}

	exec(id: string): Promise<BrandsEntity | null> {
		return this.repository.findBrandById(id)
	}
}
