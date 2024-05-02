import { config } from "../../../../../config/config"
import { ErrorDetails } from "../error.type"

export function notFoundHttp(error?: ErrorDetails) {
	return {
		status: 404,
		message: "error",
		error: {
			title: error?.title || "Resource",
			detail: error?.detail || "Not Found"
		},
		api: { version: config.version }
	}
}
