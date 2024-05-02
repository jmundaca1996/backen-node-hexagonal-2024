import { Request, Response, NextFunction } from "express"
import { unprocessableContentHtpp } from "../../../shared/adaptarers/http-response-status/client/unprocessable-content.http"
import Joi from "joi"
import { JsonWebTokenService } from "../../infrastructure/jwt/jsonwebtoken.service"


type TokenRequest = { authorization: string }

export function validateRequestToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const schema = Joi.object<TokenRequest>({
		authorization: Joi.string().required()
	}).options({ abortEarly: false })

	const result = schema.validate({ authorization: req.headers.authorization })

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

	const jwtService = new JsonWebTokenService()
	const isValidJWT = jwtService.validatetoken(result.value.authorization)
	const errors = [
		{
			title: "Token",
			detail: "Token is not valid"
		}
	]

	if (!isValidJWT[0]) {
		const invalidRequest = unprocessableContentHtpp(errors)
		res.status(invalidRequest.status).json(invalidRequest)
		return
	}

	req.headers.user = isValidJWT[1]

	next()
}
