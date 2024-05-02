import { GetAllBProductsUseCase } from "../domain/products.use-cases"
import { getCollection } from "../../shared/adaptarers/resources/get.collection"
import { internalServerError } from "../../shared/adaptarers/http-response-status/internal-server-error.http"
import { Paginador } from "../domain/products.dto"
import { Request, Response } from "express"
import { successHtpp } from "../../shared/adaptarers/http-response-status/client"

export class AllProductsController {
	constructor(private readonly getAllProductsUseCase: GetAllBProductsUseCase) {}
	async run(req: Request, res: Response) {
		const params = req.query as unknown as Paginador
		try {
			const allProdcuts = await this.getAllProductsUseCase.exec(params)
			const allProductsResource = getCollection("products", allProdcuts.products)
			allProductsResource.meta = allProdcuts.meta

			const successRequest = successHtpp({ resource: allProductsResource })
			return res.status(successRequest.status).json(successRequest)
		} catch (error) {
            // save in system logs
            console.log(error)
            const errorServer = internalServerError()
            return res.status(errorServer.status).json(errorServer)
        }
	}
}
