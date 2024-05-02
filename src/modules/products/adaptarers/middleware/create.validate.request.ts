import { CreateProductDto } from "./../../domain/products.dto"
import { Request, Response, NextFunction } from "express"
import { unprocessableContentHtpp } from "../../../shared/adaptarers/http-response-status/client/unprocessable-content.http"
import Joi from "joi"

type CreateProductRequest = Omit<CreateProductDto, "slug" | "createdAt" | "updatedAt">

export function validateRequestCreate(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const schema = Joi.object<CreateProductRequest>({
        name: Joi.string().required(),
        price: Joi.number().positive().min(0).required(),
        brand: {
            id: Joi.string().required(),
            name: Joi.string().required()
        }
	}).options({ abortEarly: false })

	const result = schema.validate(req.body as CreateProductRequest)

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
