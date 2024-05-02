import { CreateProductDto } from "../domain/products.dto"
import { CreateProductUseCase } from "../domain/products.use-cases"
import { ProductEntity } from "../domain/products.entity"
import { ProductsRespository } from "../domain/products.domain.repository"

export class CreateProductUseCaseImpl implements CreateProductUseCase {
	constructor(private readonly repository: ProductsRespository) {}

	async exec(product: CreateProductDto): Promise<ProductEntity> {
		const newProduct = await this.repository.createProduct(product)
		return newProduct
	}
}
