// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCollection(type: string, entities: Array<any>) {
	const collection = {
		data: entities.map((entity) => {
			const { id, ...attributes } = entity
			return {
				type: type,
				id,
				attributes
			}
		}),
		meta: { total: entities.length },
		jsonapi: { version: "1.0" }
	}

	return collection
}
