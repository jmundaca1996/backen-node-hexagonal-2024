import { DeleteProductUseCase } from "../domain/products.use-cases"
import { internalServerError } from "../../shared/adaptarers/http-response-status/internal-server-error.http"
import { notFoundHttp } from "../../shared/adaptarers/http-response-status/client/not-found.http"
import { Request, Response } from "express"
import { successHtpp } from "../../shared/adaptarers/http-response-status/client/success.http"

export class DeleteProductController {
	constructor(private readonly deleteProduct: DeleteProductUseCase) {}

	async run(req: Request, res: Response) {
		const { id } = req.params
		try {
			const isDeleted = await this.deleteProduct.exec(id)
			if (isDeleted) {
				const successRequest = successHtpp({
					message: "deleted",
					resource: null
				})
				return res.status(successRequest.status).json(successRequest)
			}

			const errorDetails = {
				title: "Product",
				detail: `Product with id ${id} not found`
			}

			const notFoundRequest = notFoundHttp(errorDetails)
			return res.status(notFoundRequest.status).json(notFoundRequest)
		} catch (error) {
			//Save in system logs
			console.log(error)
			const errorServer = internalServerError({
				status: 500
			})
			return res.status(errorServer.status).json(errorServer)
		}
	}
}
