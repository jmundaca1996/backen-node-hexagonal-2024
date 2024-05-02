import { Request, Response, NextFunction } from "express"
import { unprocessableContentHtpp } from "../../../shared/adaptarers/http-response-status/client"
import { UpdateBrandsDto } from "../../domain/brands.dto"
import Joi from "joi"

export function validateRequestUpdate(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const schema = Joi.object<UpdateBrandRequest>({
		id: Joi.string()
			.required()
			.regex(/^[0-9a-fA-F]{24}$/)
			.message("Invalid Id"),
		name: Joi.string().optional()
	}).options({ abortEarly: false })

	const request = {
		id: req.params.id,
		...req.body as UpdateBrandsDto
	}

	const result = schema.validate(request)

	if (result.error) {
		const errors = result.error.details.map((error) => {
			return {
				title: error.context?.label || "Invalid Attribute",
				detail: error.message
			}
		})

		const invalidRequest = unprocessableContentHtpp(errors)
		res.status(invalidRequest.status).json(invalidRequest)
		return
	}
	next()
}

interface UpdateBrandRequest extends UpdateBrandsDto {
	id?: string
}
