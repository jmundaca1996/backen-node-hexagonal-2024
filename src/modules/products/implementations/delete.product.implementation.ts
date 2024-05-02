import { DeleteProductController } from "../adaptarers"
import { DeleteProductUseCaseImpl } from "../application/delete-product.use-case"
import { MongoProductsDatasource } from "../infrastructure/mongo.products.datasource"
import { MongoProductsRepository } from "../infrastructure/mongo.products.repository"

const dataSource = new MongoProductsDatasource()
const repository = new MongoProductsRepository(dataSource)
const useCase = new DeleteProductUseCaseImpl(repository)
export const deleteProductController = new DeleteProductController(useCase)
