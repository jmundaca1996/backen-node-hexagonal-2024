import { GetAllBProductsUseCase } from "../domain/products.use-cases"
import { Paginador, DEFAULT_QUERY } from "../domain/products.dto"
import { ProductsPaginated } from "../domain/products.entity"
import { ProductsRespository } from "../domain/products.domain.repository"

export class AllProductsUseCaseImpl implements GetAllBProductsUseCase {
	constructor(private readonly repository: ProductsRespository) {}

	async exec(parms: Paginador): Promise<ProductsPaginated> {
		const { limit, page, search, brand, sort } = parms
		const parmsQuery: Paginador = {
			limit: Number(limit) || DEFAULT_QUERY.limit,
			page: Number(page) || DEFAULT_QUERY.page,
			search,
			brand,
			sort: sort || DEFAULT_QUERY.sort
		}

		return await this.repository.getAllProducts(parmsQuery)
	}
}
