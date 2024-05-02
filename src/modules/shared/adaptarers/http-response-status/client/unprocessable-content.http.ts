import { config } from "../../../../../config/config"
import { ErrorDetails } from "../error.type"

export function unprocessableContentHtpp(errorRequest: Array<ErrorDetails>) {
	const errors = errorRequest

	errors.forEach((error) => {
		error.detail = error.detail.replace(/"/g, "")
	})

	return {
		status: 422,
		message: "error",
		errors,
		api: { version: config.version }
	}
}
