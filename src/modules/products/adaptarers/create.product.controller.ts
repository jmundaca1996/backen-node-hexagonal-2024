import { createdHtpp } from "../../shared/adaptarers/http-response-status/client/created.htpp"
import { CreateProductDto } from "../domain/products.dto"
import { CreateProductUseCase } from "../domain/products.use-cases"
import { getResource } from "../../shared/adaptarers/resources/get.resource"
import { internalServerError } from "../../shared/adaptarers/http-response-status/internal-server-error.http"
import { Request, Response } from "express"

export class CreateProductController {
	constructor(private readonly createProduct: CreateProductUseCase) {}

	async run(req: Request, res: Response) {
		const productDto = req.body as CreateProductDto
		try {
			const newProduct = await this.createProduct.exec(productDto)
			const productResource = getResource("products", newProduct)
			const createdRequest = createdHtpp(productResource)
			return res.status(createdRequest.status).json(createdRequest)
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
