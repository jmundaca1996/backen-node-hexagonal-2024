import app from "./app"
import { config, envIcon } from "./config/config"
import { mongodb, clientMongoDB } from "./database/mongodb"
import { redis } from "./database/redis"

(async () => main())()

async function main() {
	try {
		await clientMongoDB()
		console.log("🔒 MongoDB: connected")
		await redis.connect()
		console.log("🔒 Redis: connected")
		
		app.listen(config.port, () => {
			console.log(`${envIcon()} environment: ${config.nodeEnv}`)
			console.log(`💼 Project: ${config.name}`)
			console.log(`📦 Version: ${config.version}`)
			console.log(
				`🌐 Listening on: ${config.apiUrl}:${config.port}/api/v1/health`
			)
		})
	} catch (error) {
		console.log("Error connecting to MongoDB:", error)
	} finally {
		await mongodb.close()
	}
}
