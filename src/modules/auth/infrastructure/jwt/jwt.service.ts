export interface JwtService {
	validatetoken(token: string): [boolean, string]
	generateToken(id: string): Promise<string>
}
