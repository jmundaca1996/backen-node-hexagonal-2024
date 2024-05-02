import { clientMongoDB } from "../../../database/mongodb"
import { ObjectId } from "mongodb"

interface Brand {
	_id?: ObjectId
	name: string
	slug: string
}

export async function brandEntity() {
	const brandEntity = await clientMongoDB()
	return brandEntity.collection<Brand>("brands")
}
