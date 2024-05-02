import { FindBrandController } from "../adaptarers/find.brand.controller"
import { FindBrandUseCaseImpl } from "../application/find-brand.use-case"
import { MongoBrandsDataSource } from "../infrastructure/mongo.brands.datasource"
import { MongoBrandsRepository } from "../infrastructure/mongo.brands.repository"

const dataSource = new MongoBrandsDataSource()
const repository = new MongoBrandsRepository(dataSource)
const findUseCase = new FindBrandUseCaseImpl(repository)
export const findBrandController = new FindBrandController(findUseCase)
