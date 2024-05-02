import { DeleteBrandController } from "../adaptarers/delete.brand.controller";
import { DeleteBrandUseCaseImpl } from '../application/delete.-brand.use-case';
import { MongoBrandsDataSource } from "../infrastructure/mongo.brands.datasource";
import { MongoBrandsRepository } from "../infrastructure/mongo.brands.repository"

const dataSource = new MongoBrandsDataSource()
const repository = new MongoBrandsRepository(dataSource)
const deleteUseCase = new DeleteBrandUseCaseImpl(repository)
export const deleteBrandController = new DeleteBrandController(deleteUseCase)