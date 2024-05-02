import { clientMongoDB } from "../../../database/mongodb"
import { ObjectId } from "mongodb"
import { Product as IProduct } from "../domain/products.entity"

export interface Product extends Omit<IProduct, "id"> {
	_id?: ObjectId
}

export async function ProductsEntity() {
	const ProductsEntity = await clientMongoDB()
	
	await ProductsEntity.collection<Product>("products").createIndex({ name: 1 })
	await ProductsEntity.collection<Product>("products").createIndex({ "brand.name": 1 })

	return ProductsEntity.collection<Product>("products")
}
