import { MongoBrandsDataSource } from "../infrastructure/mongo.brands.datasource"
import { MongoBrandsRepository } from "../infrastructure/mongo.brands.repository"
import { UpdateBrandController } from "../adaptarers/update.brand.controller"
import { UpdateBrandUseCaseImpl } from "../application/update-brand.use-case"

const dataSource = new MongoBrandsDataSource()
const repository = new MongoBrandsRepository(dataSource)
const updateUseCase = new UpdateBrandUseCaseImpl(repository)
export const updateBrandController = new UpdateBrandController(updateUseCase)