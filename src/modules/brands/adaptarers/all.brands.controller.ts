import { getAllBrandsUseCase } from "../domain/brands.use-cases"
import { getCollection } from "../../shared/adaptarers/resources/get.collection"
import { internalServerError } from "../../shared/adaptarers/http-response-status/internal-server-error.http"
import { Request, Response } from "express"
import { successHtpp } from "../../shared/adaptarers/http-response-status/client"

export class GetAllBrandsController {
	constructor(private readonly getAllBrandsUseCase: getAllBrandsUseCase) {}

	public async run(_req: Request, res: Response) {
		try {
			const allBrands = await this.getAllBrandsUseCase.exec()
			const brandsResource = getCollection("brands", allBrands)
			const successRequest = successHtpp({ resource: brandsResource })
			return res.status(successRequest.status).json(successRequest)
		} catch (error) {
			// save in system logs
			console.log(error)
			const errorServer = internalServerError()
			return res.status(errorServer.status).json(errorServer)
		}
	}
}
