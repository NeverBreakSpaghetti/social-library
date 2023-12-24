import {UserEntity} from "./user-entity";

export interface UserRepo {
    save(user: UserEntity): void;
}