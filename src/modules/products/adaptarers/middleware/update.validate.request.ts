import { Request, Response, NextFunction } from "express"
import { unprocessableContentHtpp } from "../../../shared/adaptarers/http-response-status/client"
import { UpdateProductDto } from "../../domain/products.dto"
import Joi from "joi"

type UpdateProductRequest = Omit<
	UpdateProductDto,
	"slug" | "createdAt" | "updatedAt"
> & {
	id: string
}

export function validateRequestUpdate(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const schema = Joi.object<UpdateProductRequest>({
		id: Joi.string()
			.required()
			.regex(/^[0-9a-fA-F]{24}$/)
			.message("Invalid Id"),
		name: Joi.string().optional(),
        price: Joi.number().positive().min(0).optional(),
        brand:{
            id: Joi.string().optional(),
            name: Joi.string().optional()
        }
	}).options({ abortEarly: false })

	const request = {
		id: req.params.id,
		...req.body
	} as UpdateProductRequest

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
