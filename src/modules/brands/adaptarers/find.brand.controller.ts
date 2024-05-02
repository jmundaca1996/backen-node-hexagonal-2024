import { FindBrandUseCase } from "./../domain/brands.use-cases"
import { getResource } from "../../shared/adaptarers/resources/get.resource"
import { internalServerError } from "../../shared/adaptarers/http-response-status/internal-server-error.http"
import { notFoundHttp } from "../../shared/adaptarers/http-response-status/client"
import { Request, Response } from "express"
import { successHtpp } from "../../shared/adaptarers/http-response-status/client"

export class FindBrandController {
	constructor(private readonly findUseCase: FindBrandUseCase) {}

	public async run(req: Request, res: Response) {
		try {
			const { id } = req.params
			const foundBrand = await this.findUseCase.exec(id)

			if (foundBrand) {
				const brandResource = getResource("brands", foundBrand)
				const successRequest = successHtpp({ resource: brandResource })
				return res.status(successRequest.status).json(successRequest)
			}

			const notFoundRequest = notFoundHttp()
			return res.status(notFoundRequest.status).json(notFoundRequest)
		} catch (error) {
			//Save in system logs
			console.log(error)
			const errorServer = internalServerError()
			return res.status(errorServer.status).json(errorServer)
		}
	}
}
