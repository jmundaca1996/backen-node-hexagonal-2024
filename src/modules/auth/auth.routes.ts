import { loginController } from "./modules.implementation"
import { Request, Response, Router } from "express"
import { validateRequestLogin } from "./adaptarers/middleware/login.validate.request"

export class AuthRoute {
	static get routesV1(): Router {
		const router = Router()
		router.post("/", validateRequestLogin, (req: Request, res: Response) =>
			loginController.run(req, res)
		)
		return router
	}
}
