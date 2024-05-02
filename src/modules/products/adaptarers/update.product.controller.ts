import { getResource } from "../../shared/adaptarers/resources/get.resource"
import { internalServerError } from "../../shared/adaptarers/http-response-status/internal-server-error.http"
import { notFoundHttp, successHtpp } from "../../shared/adaptarers/http-response-status/client"
import { Request, Response } from "express"
import { UpdateProductDto } from "../domain/products.dto"
import { UpdateProductUseCase } from "../domain/products.use-cases"

export class UpdateProductController {
	constructor(private readonly updateProduct: UpdateProductUseCase) {}

	async run(req: Request, res: Response) {
		const { id } = req.params
		const productDto = req.body as UpdateProductDto
		try {
			const updatedProduct = await this.updateProduct.exec(id, productDto)
			if (updatedProduct) {
				const productResource = getResource("products", updatedProduct)
				const successRequest = successHtpp({
					message: "updated",
					resource: productResource
				})
				
                return res.status(successRequest.status).json(successRequest)
			}

            const notFoundDetails = {
                title: "Product not found",
                detail: `Product with id ${id} not found`
            }

            const notFoundRequest = notFoundHttp(notFoundDetails)
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
