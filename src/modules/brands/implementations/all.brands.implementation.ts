import { GetAllBrandsController } from "../adaptarers/all.brands.controller"
import { getAllBrandsUseCaseImpl } from "../application/all-brands.use-case"
import { MongoBrandsDataSource } from "../infrastructure/mongo.brands.datasource"
import { MongoBrandsRepository } from "../infrastructure/mongo.brands.repository"

const dataSource = new MongoBrandsDataSource()
const repository = new MongoBrandsRepository(dataSource)
const getAllBrandsUseCase = new getAllBrandsUseCaseImpl(repository)
export const getAllBrandsController = new GetAllBrandsController(
	getAllBrandsUseCase
)
