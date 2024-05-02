export class ProductEntity {
	public readonly id: string
	public readonly name: string
	public readonly slug: string
	public readonly price: number
	public readonly brand: brand
	public readonly createdAt: Date
	public readonly updatedAt: Date

	constructor({ id, name, slug, price, brand, createdAt, updatedAt }: Product) {
		this.id = id
		this.name = name
		this.slug = slug
		this.price = price
		this.brand = brand
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

export type Product = {
	id: string
	name: string
	slug: string
	price: number
	brand: brand
	createdAt: Date
	updatedAt: Date
}

type brand = {
	id: string
	name: string
}

export type ProductsPaginated = {
	products: Array<ProductEntity>
	meta: Meta
}

type Meta = {
	currentPage: number
	totalPages: number
	total: number
	limit: number
}
