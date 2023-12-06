import { User } from "../entities/User";

export interface UserSessionRepository {

    save(user:User): Promise<void>
    getUser(): Promise<User>
    remove():Promise<void>
}