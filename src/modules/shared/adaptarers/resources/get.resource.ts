// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getResource(type: string, entity: any) {
	const { id, ...attributes } = entity

	return {
		data: {
			type: type,
			id,
			attributes
		},
		api: { version: "1.0.0" }
	}
}
