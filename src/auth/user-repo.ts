import {UserEntity} from "./user-service";

export interface UserRepo {
    save(user: UserEntity): void;
}