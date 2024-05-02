import packageJson from "../../package.json";
import { envs } from "./envs";

export const config = {
  version: packageJson.version,
  name: packageJson.name,
  description: packageJson.description,
  author: packageJson.author,

  nodeEnv: envs.NODE_ENV,
  apiUrl : envs.API_URL,
  jwtKey: envs.jwtKey,
  databaseName: envs.DATABASE_NAME,
  databaseUrl: envs.DATABASE_URL,
  redisUrl: envs.REDIS_URL,
  port: envs.PORT,
  
  clientCorsOrigins: {
    test: envs.DEV_ORIGIN,
    development: envs.DEV_ORIGIN,
    production: envs.PROD_ORIGIN,
  },
};

export const envIcon = () => {
	switch (config.nodeEnv) {
		case "development": return "💻"
		case "production": return "📦"
		case "test": return "🧪"
		default: return "❓"
	}
}
