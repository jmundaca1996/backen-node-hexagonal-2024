export class AuthEntity {
	public readonly id: string
	public readonly name: string
	public readonly email: string
	public readonly password: string

	constructor({ id, name, email, password }: Auth) {
		this.id = id
		this.name = name
		this.email = email
		this.password = password
	}
}

type Auth = {
	id: string
	name: string
	email: string
	password: string
}

export type Authenticated = Omit<Auth, "password" | "id"> & { token: string }
