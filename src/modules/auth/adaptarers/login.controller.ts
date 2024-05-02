import { Request, Response } from "express"
import { LoginUseCaseImpl } from "../application/login.use-case"
import { AuthDto } from "../domain/auth.dto"

export class LoginController {
	constructor(private readonly login: LoginUseCaseImpl) {}

	public async run(req: Request, res: Response) {
		const authDto = req.body as AuthDto
		const authenticated = await this.login.exec(authDto)

		if (authenticated instanceof Array) {
			if (authenticated[0]) {
				return res.status(401).json({
					message: "error",
					errors: [
						{
							title: "Invalid Authentication",
							detail: authenticated[0]
						}
					]
				})
			}

			return res.status(404).json({
				status: 404,
				message: "error",
				errors: [
					{
						title: "User",
						detail: authenticated[1]
					}
				]
			})
		}

		return res.status(200).json({
			status: 200,
			message: "success",
			data: authenticated
		})
	}
}
