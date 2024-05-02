import { ProductEntity, ProductsPaginated } from "./products.entity"
import { CreateProductDto, Paginador, UpdateProductDto } from "./products.dto"

export interface GetAllBProductsUseCase {
	exec(parms: Paginador): Promise<ProductsPaginated>
}

export interface FindProductUseCase {
	exec(id: string): Promise<ProductEntity | null>
}

export interface CreateProductUseCase {
	exec(brand: CreateProductDto): Promise<ProductEntity>
}

export interface UpdateProductUseCase {
	exec(id:string ,brand: UpdateProductDto): Promise<ProductEntity | null>
}

export interface DeleteProductUseCase {
	exec(id: string): Promise<boolean>
}
