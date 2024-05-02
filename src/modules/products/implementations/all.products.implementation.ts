import { AllProductsController } from "../adaptarers"
import { AllProductsUseCaseImpl } from "../application/all-products.use-case"
import { MongoProductsDatasource } from "../infrastructure/mongo.products.datasource"
import { MongoProductsRepository } from "../infrastructure/mongo.products.repository"

const dataSource = new MongoProductsDatasource()
const repository = new MongoProductsRepository(dataSource)
const useCase = new AllProductsUseCaseImpl(repository)
export const allProductsController = new AllProductsController(useCase)
