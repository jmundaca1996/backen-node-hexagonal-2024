import { AuthDto } from "../../domain/auth.dto"
import { Request, Response, NextFunction } from "express"
import { unprocessableContentHtpp } from "../../../shared/adaptarers/http-response-status/client/unprocessable-content.http"
import Joi from "joi"

export function validateRequestLogin(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const schema = Joi.object<AuthDto>({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	}).options({ abortEarly: false })

	const result = schema.validate(req.body as AuthDto)

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
