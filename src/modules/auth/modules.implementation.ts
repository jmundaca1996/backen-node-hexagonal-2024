import { LoginUseCaseImpl } from "./application/login.use-case"
import { LoginController } from "./adaptarers/login.controller"
import { MongoRepository } from "./infrastructure/mongo.auth.repository"
import { MongoAuthDataSource } from "./infrastructure/mongo.auth.datasource"
import { JsonWebTokenService } from './infrastructure/jwt/jsonwebtoken.service';

const dataSource = new MongoAuthDataSource()
const respository = new MongoRepository(dataSource)
const jwtService = new JsonWebTokenService()
const loginUseCase = new LoginUseCaseImpl(respository, jwtService)
export const loginController = new LoginController(loginUseCase)
