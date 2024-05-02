import { config } from "../../../../config/config"
import { ErrorDetails } from "./error.type"

export function internalServerError(params?: Partial<ErrorServer>) {
	return {
		status: params?.status || 500,
		message: params?.message || "error",
		errors: [
			{
				title: params?.errors?.title ?? "Oops!",
				detail:
					params?.errors?.detail || "Please try again, we are working on it."
			}
		],
		api: { version: config.version }
	}
}

interface ErrorServer {
	status: number
	message: string
	errors: ErrorDetails
}
