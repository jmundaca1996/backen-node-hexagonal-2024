import { Request, Response, NextFunction } from "express"
import { unprocessableContentHtpp } from "../../../shared/adaptarers/http-response-status/client"
import Joi from "joi"

export function validateRequestDelete(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const schema = Joi.object<{ id: string }>({
		id: Joi.string()
			.required()
			.regex(/^[0-9a-fA-F]{24}$/)
			.message("Invalid Id")
	}).options({ abortEarly: false })

	const request = req.params as { id: string }

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
