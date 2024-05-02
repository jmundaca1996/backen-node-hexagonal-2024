import { FindProductController } from "../adaptarers"
import { FindProductUseCaseImpl } from '../application/find-product.use-case';
import { MongoProductsDatasource } from "../infrastructure/mongo.products.datasource";
import { MongoProductsRepository } from "../infrastructure/mongo.products.repository";

const dataSource = new MongoProductsDatasource()
const repository = new MongoProductsRepository(dataSource)
const useCase = new FindProductUseCaseImpl(repository)
export const findProductController = new FindProductController(useCase)