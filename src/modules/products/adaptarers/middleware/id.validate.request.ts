import { Request, Response, NextFunction } from "express"
import { unprocessableContentHtpp } from "../../../shared/adaptarers/http-response-status/client/unprocessable-content.http"
import Joi from "joi"

type IdRequest = { id: string }

export function validateRequestId(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const schema = Joi.object<IdRequest>({
		id: Joi.string()
			.required()
			.regex(/^[0-9a-fA-F]{24}$/)
			.message("Invalid Id")
	}).options({ abortEarly: false })

	const result = schema.validate( req.params as IdRequest)

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
