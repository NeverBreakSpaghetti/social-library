export interface UserDto {
    user: string;
    passwordHash: string;
}
export const isValid = (userToValidate: any) => {
    const keys = Object.keys(userToValidate);
    if (keys.length !== 2)
        return false
    return keys.includes('user') && keys.includes('passwordHash') && userToValidate.user !== '' && userToValidate.passwordHash !== ''
};