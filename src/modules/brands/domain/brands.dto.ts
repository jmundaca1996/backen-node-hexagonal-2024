export type CreateBrandDto = {
	name: string
	slug: string
}

export type UpdateBrandsDto =  Partial<CreateBrandDto>
