import {UserDto} from "./user-dto";
import {hash} from "../utils/crypto-utils";
import {UserRepo} from "./user-repo";
import {UserEntity} from "./user-entity";

export default class UserService {
    constructor(private readonly userRepo: UserRepo) {}
    public add(user: UserDto): void {
        const hashedPassword = hash(user.passwordHash)
        const userEntity = UserEntity.create(user.user, hashedPassword)

        this.userRepo.save(userEntity)
    }
}