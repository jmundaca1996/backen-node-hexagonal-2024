import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"

import { config } from "./config/config"
import errorHandler from "./modules/health/infrastructure/middleware/errorHandler"
import fourOhFour from "./modules/health/infrastructure/middleware/fourOhFour"

import { AppRoutes } from "./modules/app.routing"

const app = express()

// Apply most middleware first
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(
	cors({
		// @ts-expect-error no-implicit-any
		origin: config.clientCorsOrigins[config.nodeEnv] ?? "*"
	})
)

app.use(helmet())
app.use(morgan("tiny"))

// Apply routes before error handling
app.use(AppRoutes.routes)

// Apply error handling last
app.use(fourOhFour)
app.use(errorHandler)

export default app
