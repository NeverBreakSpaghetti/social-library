import {UserDto} from "../../src/auth/user-dto";
import UserService from "../../src/auth/user-service";
import * as CryptoUtils from "../../src/utils/crypto-utils";

import {UserRepo} from "../../src/auth/user-repo";
describe('UserService', () => {
    let repoMock: UserRepo
    beforeAll(() => {
        repoMock = {
            save: jest.fn()
        }
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('add', () => {
        it('should accept a user as input', () => {
            const userService = new UserService(repoMock);
            const user: UserDto = {user: "Gianni", passwordHash: "bisteccaHashata"}

            expect(()=>userService.add(user)).not.toThrow();
        });

        it('should save the user hashing again his password', () => {
            jest.spyOn(CryptoUtils, 'hash').mockReturnValue('hashedAgainPassword')
            const userService = new UserService(repoMock);
            const user: UserDto = {user: "Luca", passwordHash: "arrosticinoHashato"}

            userService.add(user);

            expect(CryptoUtils.hash).toHaveBeenCalledWith(user.passwordHash)
            expect(repoMock.save).toHaveBeenCalledWith({user: "Luca", password: "hashedAgainPassword"})
        });
    });
});