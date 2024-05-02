import { getResource } from "../../shared/adaptarers/resources/get.resource"
import { notFoundHttp, successHtpp } from "../../shared/adaptarers/http-response-status/client"
import { Request, Response } from "express"
import { UpdateBrandsDto } from "../domain/brands.dto"
import { UpdateBrandUseCase } from "../domain/brands.use-cases"

export class UpdateBrandController {
	constructor(private readonly updateUseCase: UpdateBrandUseCase) {}

	public async run(req: Request, res: Response) {
		const { id } = req.params
		const brand = req.body as UpdateBrandsDto

		const updatedBrand = await this.updateUseCase.exec(id, brand)

		if (updatedBrand) {
			const brandResource = getResource("brands", updatedBrand)
			const successRequest = successHtpp({ resource: brandResource })
			return res.status(successRequest.status).json(successRequest)
		}
		const notFoundDetails = {
			title: "Brand not found",
			detail: `Brand with id ${id} not found`
		}

		const notFoundRequest = notFoundHttp(notFoundDetails)
		return res.status(notFoundRequest.status).json(notFoundRequest)
	}
}
