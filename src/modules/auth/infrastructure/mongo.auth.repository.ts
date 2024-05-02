import { AuthDataSource } from "../domain/auth.domain.datasource"
import { AuthEntity } from "../domain/auth.entity"
import { AuthRepository } from "../domain/auth.domain.repository"

export class MongoRepository implements AuthRepository {
	constructor(private readonly datasource: AuthDataSource) {
		this.datasource = datasource
	}

	findUserById(id: string): Promise<AuthEntity | null> {
		const user = this.datasource.findUserById(id)
		return user
	}

	async findUserByEmail(email: string): Promise<AuthEntity | null> {
		const user = await this.datasource.findUserByEmail(email)
		return user
	}
}
