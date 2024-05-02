import { successHtpp } from "./index"

export function createdHtpp<T>(resource: T) {
	return successHtpp({ status: 201, message: "created", resource })
}
