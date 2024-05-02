import { BrandsRespository } from "../domain/brands.domain.repository";
import { BrandsEntity } from "../domain/brands.entity";
import { getAllBrandsUseCase } from "../domain/brands.use-cases";

export class getAllBrandsUseCaseImpl implements getAllBrandsUseCase {
    constructor(private readonly repository: BrandsRespository) {}

    async exec(): Promise<Array<BrandsEntity>> {
        return this.repository.getBrands()
    }
}