import { clientMongoDB } from "../../../database/mongodb"
import { ObjectId } from "mongodb"

interface User {
	_id?: ObjectId
	name: string
	email: string
	password: string
}

export async function userEntity() {
	const userEntity = await clientMongoDB()
	return userEntity.collection<User>("users")
}
