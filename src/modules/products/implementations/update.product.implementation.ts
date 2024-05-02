import { MongoProductsDatasource } from '../infrastructure/mongo.products.datasource';
import { MongoProductsRepository } from '../infrastructure/mongo.products.repository';
import { UpdateProductController } from '../adaptarers';
import { UpdateProductUseCaseImpl } from '../application/update-products.use-case';

const dataSource = new MongoProductsDatasource()
const repository = new MongoProductsRepository(dataSource)
const useCase = new UpdateProductUseCaseImpl(repository)
export const updateProductController = new UpdateProductController(useCase)