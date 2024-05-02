import { Request, Response } from "express"
import { config } from "../../../../config/config"

export class getCheckController {
	constructor() {}
	public async run(_: Request, res: Response) {
		return res.status(200).json({
			api: config.name,
			description: config.description,
			author: config.author,
			version: config.version
		})
	}
}
