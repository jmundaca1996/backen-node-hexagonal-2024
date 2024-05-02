import { Router } from "express"
import {
	validateRequestId,
	validateRequestCreate,
	validateRequestUpdate,
	validateRequestPaginador
} from "./adaptarers/middleware"
import {
	allProductsController,
	createProductController,
	deleteProductController,
	findProductController,
	updateProductController
} from "./implementations"

export class ProductsRoute {
	static get routesV1(): Router {
		const router = Router()

		router.get(
			"/",
			validateRequestPaginador,
			allProductsController.run.bind(allProductsController)
		)
		router.post(
			"/",
			validateRequestCreate,
			createProductController.run.bind(createProductController)
		)
		router.get(
			"/:id",
			validateRequestId,
			findProductController.run.bind(findProductController)
		)
		router.patch(
			"/:id",
			validateRequestUpdate,
			updateProductController.run.bind(updateProductController)
		)
		router.delete(
			"/:id",
			validateRequestId,
			deleteProductController.run.bind(deleteProductController)
		)

		return router
	}
}
