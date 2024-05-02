import { AuthDto } from "../domain/auth.dto"
import { Authenticated, AuthEntity } from "../domain/auth.entity"
import { AuthRepository } from "../domain/auth.domain.repository"
import { JwtService } from "../infrastructure/jwt/jwt.service"
import { LoginUseCase } from "../domain/login.domain.use-case"
import bycrypt from "bcryptjs"

export class LoginUseCaseImpl implements LoginUseCase {
	constructor(
		private readonly repository: AuthRepository,
		private readonly jwt: JwtService
	) {
		this.repository = repository
	}

	async exec(loginDto: AuthDto): Promise<Authenticated | Array<string>> {
		const user = await this.repository.findUserByEmail(loginDto.email)
		if (user) {
			const isValid = await this.validationLogin(loginDto, user)
			if (isValid) {
				const token = await this.generateJWT(user.id.toString())
				return {
					name: user.name,
					email: user.email,
					token
				}
			}

			return ["Email or password incorrect", ""]
		}

		return ["", "User not found"]
	}

	private async validationLogin(
		auth: AuthDto,
		user: AuthEntity
	): Promise<boolean> {
		return await bycrypt.compare(auth.password, user.password)
	}

	private async generateJWT(id: string): Promise<string> {
		return await this.jwt.generateToken(id)
	}
}
