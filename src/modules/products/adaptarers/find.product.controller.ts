import { FindProductUseCase } from "../domain/products.use-cases"
import { getResource } from "../../shared/adaptarers/resources/get.resource"
import { internalServerError } from "../../shared/adaptarers/http-response-status/internal-server-error.http"
import { notFoundHttp } from "../../shared/adaptarers/http-response-status/client/not-found.http"
import { Request, Response } from "express"
import { successHtpp } from "../../shared/adaptarers/http-response-status/client/success.http"

export class FindProductController {
	constructor(private readonly findProduct: FindProductUseCase) {}

	async run(req: Request, res: Response) {
		const { id } = req.params
		try {
			const founProduct = await this.findProduct.exec(id)
			if (founProduct) {
				const productResource = getResource("products", founProduct)
				const successRequest = successHtpp({ resource: productResource })
				return res.status(successRequest.status).json(successRequest)
			}

			const errorDetails = {
				title: "Product",
				detail: `Product with id ${id} not found`
			}

			const notFoundRequest = notFoundHttp(errorDetails)
			return res.status(notFoundRequest.status).json(notFoundRequest)
            
		} catch (error) {
			console.log(error)
			const errorServer = internalServerError({
				status: 500
			})
			return res.status(errorServer.status).json(errorServer)
		}
	}
}
