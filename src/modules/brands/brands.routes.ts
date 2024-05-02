import {
	createBrandsController,
	findBrandController,
	updateBrandController,
	deleteBrandController,
	getAllBrandsController
} from "./implementations"

import { Router } from "express"

import {
	validateRequestCreate,
	validateRequestFind,
	validateRequestUpdate,
	validateRequestDelete
} from "./adaptarers/middleware"

export class BrandsRoute {
	static get routesV1(): Router {
		const router = Router()

		router.get("/", getAllBrandsController.run.bind(getAllBrandsController))
		router.post(
			"/",
			validateRequestCreate,
			createBrandsController.run.bind(createBrandsController)
		)
		router.get(
			"/:id",
			validateRequestFind,
			findBrandController.run.bind(findBrandController)
		)
		router.patch(
			"/:id",
			validateRequestUpdate,
			updateBrandController.run.bind(updateBrandController)
		)
		router.delete(
			"/:id",
			validateRequestDelete,
			deleteBrandController.run.bind(deleteBrandController)
		)

		return router
	}
}
