import { Product } from "./products.entity"

export type CreateProductDto = Omit<Product, "id">
export type UpdateProductDto = Partial<Omit<Product, "id" | "createdAt">>

export interface Paginador {
	page: number
	limit: number
	sort?: "asc" | "desc"
	search?: string
	brand?: string
}

export const DEFAULT_QUERY: Paginador = {
	limit: 10,
	page: 1,
	sort: "asc"
}