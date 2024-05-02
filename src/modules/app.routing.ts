import { AuthRoute } from "./auth/auth.routes"
import { BrandsRoute } from "./brands/brands.routes"
import { HealthRoute } from "./health/health.routes"
import { ProductsRoute } from "./products/products.routes"
import { Router } from "express"
import { validateRequestToken } from "./shared/adaptarers/middleware"

export class AppRoutes {
	static get routes(): Router {
		const router = Router()

		router.get("/", (_req, res) => {
			res.redirect("/api/v1/health")
		})
		router.get("/api/v1/", (_req, res) => {
			res.redirect("/api/v1/health")
		})
		router.use("/api/v1/health", HealthRoute.routesV1)
		router.use("/api/v1/auth", AuthRoute.routesV1)
		router.use("/api/v1/brands", validateRequestToken, BrandsRoute.routesV1)
		router.use("/api/v1/products", validateRequestToken, ProductsRoute.routesV1)

		return router
	}
}
