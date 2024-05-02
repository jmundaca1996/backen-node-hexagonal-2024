import { CreateBrandDto } from "../../domain/brands.dto"
import { Request, Response, NextFunction } from "express"
import { unprocessableContentHtpp } from '../../../shared/adaptarers/http-response-status/client/unprocessable-content.http';
import Joi from "joi"

export function validateRequestCreate(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const schema = Joi.object<Omit<CreateBrandDto,"slug">>({
        name: Joi.string().required()
	}).options({ abortEarly: false })

	const result = schema.validate(req.body as Omit<CreateBrandDto,"slug">)
	
	if (result.error) {
		const errors = result.error.details.map((error) => {
			return {
				title:  error.context?.label || "Invalid Attribute",
				detail: error.message
			}
		})
	
		const invalidRequest = unprocessableContentHtpp(errors)
		res.status(invalidRequest.status).json(invalidRequest)
		return
	}
	next()
}
