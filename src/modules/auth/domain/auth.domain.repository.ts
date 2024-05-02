import { AuthEntity } from './auth.entity';

export abstract class AuthRepository {
    abstract findUserById(id: string): Promise<AuthEntity | null>
    abstract findUserByEmail(email: string): Promise<AuthEntity | null>
}
