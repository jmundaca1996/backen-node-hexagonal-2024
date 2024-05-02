import { createClient } from "redis"
import { config } from "../../config/config"

export const redis = createClient({
	url: config.redisUrl
})

redis.on("error", (err) => console.log("⛔ Redis error: ", err))
