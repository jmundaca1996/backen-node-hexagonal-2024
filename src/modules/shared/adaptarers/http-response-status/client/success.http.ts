import { config } from "../../../../../config/config"

export function successHtpp<T>(params: {
	status?: number
	message?: string
	resource: T | null
}) {
	if (params.resource) {
		return {
			status: params.status || 200,
			message: params.message || "success",
			...params.resource
		}
	} 

	return {
		status: params.status || 200,
		message: params.message || "success",
		data: null,
		api: { version: config.version }
	}


}
