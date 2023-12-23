import crypto from "crypto";
import UserService from "../../src/auth/user-service";
import {hash} from "../../src/utils/crypto-utils";

describe('CryptoUtils', () => {
    describe('hash', () => {
        it('should hash a plain text with sha256', () => {
            jest.spyOn(crypto, 'createHash')

            hash("plainText");

            expect(crypto.createHash).toHaveBeenCalledWith('sha256')
        });

        it('should return an hash as string of a plain text', () => {
            expect(hash("plainText")).toBe("08a9b262078244cb990cb5746a7364bfd0b1ef95f8dd9ab61491edc050a1eb7e");
        });

        it('should return an hash as string of an empty plain text', () => {
            expect(hash("")).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
        });
    });
});