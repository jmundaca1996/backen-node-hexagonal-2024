import { DeleteBrandUseCase } from "../domain/brands.use-cases";
import { notFoundHttp, successHtpp } from "../../shared/adaptarers/http-response-status/client";
import { Request, Response } from "express";

export class DeleteBrandController {
	constructor(private readonly deleteBrand: DeleteBrandUseCase) {}

	public async run(req: Request, res: Response) {
		const { id } = req.params
		const deleted = await this.deleteBrand.exec(id)

		if (deleted) {
			const successRequest = successHtpp({ message: "deleted", resource: null })
			return res.status(successRequest.status).json(successRequest)
		}

		const errorDetails = {
			title: "Brands",
			detail: `Brand with id ${id} not found`
		}
        
		const notFoundRequest = notFoundHttp(errorDetails)
		return res.status(notFoundRequest.status).json(notFoundRequest)
	}
}