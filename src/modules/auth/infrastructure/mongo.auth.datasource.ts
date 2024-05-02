import { AuthDataSource } from "../domain/auth.domain.datasource"
import { AuthEntity } from "../domain/auth.entity"
import { ObjectId } from "mongodb"
import { userEntity } from "./mongo.user.entity"

export class MongoAuthDataSource implements AuthDataSource {
	async findUserById(id: string): Promise<AuthEntity | null> {
		const query = { _id: new ObjectId(id) }
		const user = await (await userEntity()).findOne(query)

		if (user)
			return new AuthEntity({
				id: user._id.toString(),
				name: user.name,
				email: user.email,
				password: user.password
			})

		return null
	}

	async findUserByEmail(email: string): Promise<AuthEntity | null> {
		const query = { email }
		const user = await (await userEntity()).findOne(query)

		if (user)
			return new AuthEntity({
				id: user._id.toString(),
				name: user.name,
				email: user.email,
				password: user.password
			})

		return null
	}
}
