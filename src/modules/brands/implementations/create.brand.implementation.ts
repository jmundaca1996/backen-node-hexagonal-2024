import { CreateBrandController } from "../adaptarers/create.brand.controller"
import { CreateBrandUseCaseImpl } from "../application/create-brand.use-case"
import { MongoBrandsDataSource } from "../infrastructure/mongo.brands.datasource"
import { MongoBrandsRepository } from "../infrastructure/mongo.brands.repository"

const dataSource = new MongoBrandsDataSource()
const repository = new MongoBrandsRepository(dataSource)
const createBrand = new CreateBrandUseCaseImpl(repository)
export const createBrandsController = new CreateBrandController(createBrand)