import "dotenv/config"
import { get } from "env-var"

export const envs = {
	API_URL: get("API_URL").required().asString(),
	PORT: get("PORT").required().asPortNumber(),
	DATABASE_NAME: get("DATABASE_NAME").required().asString(),
	DATABASE_URL: get("DATABASE_URL").required().asString(),
	REDIS_URL: get("REDIS_URL").required().asString(),
	jwtKey: get("JWT_KEY").required().asString(),
	PUBLIC_PATH: get("PUBLIC_PATH").default("public").asString(),
	DEV_ORIGIN: get("DEV_ORIGIN").default("*").asString(),
	PROD_ORIGIN: get("PROD_ORIGIN").default("none").asString(),
	NODE_ENV: get("NODE_ENV").required().asString()
}

