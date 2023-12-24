export class UserEntity {
    private constructor(private readonly user: string, private readonly password: string) {
    }

    static create(user: string, password: string): UserEntity {
        return new UserEntity(user, password)
    }
}