import { Router } from "express"
import { getCheckController } from './infrastructure/controllers/getCheck.controller';

export class HealthRoute {
	static get routesV1(): Router {
		const router = Router()
		router.get("/", new getCheckController().run)
		return router
	}
}
