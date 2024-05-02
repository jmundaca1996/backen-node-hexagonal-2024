import { ProductEntity, ProductsPaginated } from './products.entity';
import { CreateProductDto, Paginador, UpdateProductDto } from "./products.dto"

export abstract class ProductsDataSource {
	abstract getAllProducts(parms: Paginador): Promise<ProductsPaginated>
	abstract findProductById(id: string): Promise<ProductEntity | null>
	abstract createProduct(producDto: CreateProductDto): Promise<ProductEntity>
	abstract updateProduct(id: string, productDto: UpdateProductDto): Promise<ProductEntity | null>
	abstract deleteProduct(id: string): Promise<boolean>
}
