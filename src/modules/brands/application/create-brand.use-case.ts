import { BrandsRespository } from "../domain/brands.domain.repository";
import { CreateBrandDto } from '../domain/brands.dto';
import { BrandsEntity } from "../domain/brands.entity";
import { CreateBrandUseCase } from '../domain/brands.use-cases';

export class CreateBrandUseCaseImpl implements CreateBrandUseCase {
	constructor(private readonly repository: BrandsRespository) {
        this.repository = repository
    }
    async exec(brand: CreateBrandDto): Promise<BrandsEntity> {
        const newBrand = await this.repository.createBrand(brand)
        return new BrandsEntity(newBrand)
    }
}
