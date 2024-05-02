import { FindProductUseCase } from "../domain/products.use-cases"
import { ProductEntity } from "../domain/products.entity"
import { ProductsRespository } from "../domain/products.domain.repository"

export class FindProductUseCaseImpl implements FindProductUseCase {
	constructor(private readonly repository: ProductsRespository) {}

	async exec(id: string): Promise<ProductEntity | null> {
		return await this.repository.findProductById(id)
	}
}
