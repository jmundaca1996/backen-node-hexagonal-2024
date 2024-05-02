import { DEFAULT_QUERY, Paginador } from "../../domain/products.dto"
import { Request, Response, NextFunction } from "express"
import { unprocessableContentHtpp } from "../../../shared/adaptarers/http-response-status/client/unprocessable-content.http"
import Joi from "joi"

export function validateRequestPaginador(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const schema = Joi.object<Paginador>({
		page: Joi.number()
			.integer()
			.positive()
			.min(DEFAULT_QUERY.page)
			.max(DEFAULT_QUERY.limit)
			.optional(),
		limit: Joi.number()
			.integer()
			.positive()
			.max(DEFAULT_QUERY.limit!)
			.optional(),
		sort: Joi.string().valid("asc", "desc"),
		search: Joi.string().trim().max(20).optional(),
		brand: Joi.string().max(20).optional()
	}).options({ abortEarly: false })

	const result = schema.validate(req.query)

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
