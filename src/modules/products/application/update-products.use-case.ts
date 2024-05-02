import { ProductEntity } from "../domain/products.entity";
import { ProductsRespository } from "../domain/products.domain.repository";
import { UpdateProductDto } from "../domain/products.dto";
import { UpdateProductUseCase } from "../domain/products.use-cases";

export class UpdateProductUseCaseImpl implements UpdateProductUseCase {
    constructor(private readonly repository: ProductsRespository) {}

    async exec(id: string, productDto: UpdateProductDto): Promise<ProductEntity | null> {
        return await this.repository.updateProduct(id, productDto)
    }
}