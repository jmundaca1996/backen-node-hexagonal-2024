import { CreateProductController } from "../adaptarers";
import { CreateProductUseCaseImpl } from '../application/create-product.use-case';
import { MongoProductsDatasource } from "../infrastructure/mongo.products.datasource";
import { MongoProductsRepository } from '../infrastructure/mongo.products.repository';

const dataSource = new MongoProductsDatasource()
const repository = new MongoProductsRepository(dataSource)
const useCase = new CreateProductUseCaseImpl(repository)
export const createProductController = new CreateProductController(useCase)