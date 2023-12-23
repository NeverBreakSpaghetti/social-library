import crypto from "crypto";
export const hash = (plainText: string) =>
    crypto.createHash('sha256')
        .update(plainText)
        .digest('hex');