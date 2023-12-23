import {UserDto} from "./user-dto";
import {hash} from "../utils/crypto-utils";
import {UserRepo} from "./user-repo";

export class UserEntity {
    private constructor(private readonly user: string, private readonly password: string) {}

    static create(user: string, password: string): UserEntity {
        return new UserEntity(user, password)
    }
}

export default class UserService {
    constructor(private readonly userRepo: UserRepo) {}
    public add(user: UserDto): void {
        const hashedPassword = hash(user.passwordHash)
        const userEntity = UserEntity.create(user.user, hashedPassword)

        this.userRepo.save(userEntity)
    }
}