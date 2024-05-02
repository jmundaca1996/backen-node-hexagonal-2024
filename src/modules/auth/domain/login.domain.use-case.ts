import { AuthDto } from "./auth.dto"
import { Authenticated } from "./auth.entity"

export interface LoginUseCase {
	exec(loginDto: AuthDto): Promise<Authenticated | Array<string>>
}
