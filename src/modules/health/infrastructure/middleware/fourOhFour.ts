import { RequestHandler } from "express"
import { config } from "../../../../config/config"

/**
 * JSON 404 response
 */
const fourOhFour: RequestHandler = (_req, res) => {
	return res.status(404).json({
		status: 404,
		message: "error",
		error: {
			title: "Resource",
			detail: "Not found , please check your URL"
		},
		api: { version: config.version }
	})
}

export default fourOhFour
