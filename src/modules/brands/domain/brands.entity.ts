export class BrandsEntity {
	public readonly id: string
	public readonly name: string
	public readonly slug: string

	constructor({ id, name, slug }: brands) {
		this.id = id
		this.name = name
		this.slug = slug
	}
}

type brands = {
	id: string
	name: string
	slug: string
}
