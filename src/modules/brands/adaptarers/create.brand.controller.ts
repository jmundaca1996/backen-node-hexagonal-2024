import { CreateBrandDto } from "../domain/brands.dto"
import { CreateBrandUseCase } from "../domain/brands.use-cases"
import { getResource } from "../../shared/adaptarers/resources/get.resource"
import { Request, Response } from "express"
import { internalServerError } from "../../shared/adaptarers/http-response-status/internal-server-error.http"
import { createdHtpp } from "../../shared/adaptarers/http-response-status/client"

export class CreateBrandController {
	constructor(private readonly createBrand: CreateBrandUseCase) {}

	public async run(req: Request, res: Response) {
		const brand = req.body as CreateBrandDto
		try {
			const newBrand = await this.createBrand.exec(brand)
			const brandResource = getResource("brands", newBrand)
			const createdRequest = createdHtpp(brandResource)
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
