import { config } from "../../../../config/config"
import { JwtService } from "./jwt.service"
import jwt from "jsonwebtoken"

export class JsonWebTokenService implements JwtService {
	validatetoken(token: string): [boolean, string] {
		const RequestToken = token.split(" ")[1]
		try {
			const decoded = jwt.verify(RequestToken, config.jwtKey)
			return decoded ? [true, decoded as string] : [false, ""]
		} catch (ex) {
			return [false, ""]
		}
	}

	generateToken(id: string): Promise<string> {
		const payload = { id }
		return new Promise((resolve, reject) => {
			jwt.sign(
				payload,
				config.jwtKey,
				{ expiresIn: "1h", algorithm: "HS256" },
				(err, token) => {
					if (err) {
						reject(err)
						return
					}

					resolve(token!)
					return
				}
			)
		})
	}
}
