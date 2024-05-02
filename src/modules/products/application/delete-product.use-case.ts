import { DeleteProductUseCase } from "../domain/products.use-cases"
import { ProductsRespository } from "../domain/products.domain.repository"

export class DeleteProductUseCaseImpl implements DeleteProductUseCase {
	constructor(private readonly repository: ProductsRespository) {}
	exec(id: string): Promise<boolean> {
		return this.repository.deleteProduct(id)
	}
}
