import * as Crypto from 'expo-crypto'
import Constants from 'expo-constants'
import CryptoJS from 'crypto-js'

const SALT = Constants.expoConfig?.extra?.salt
const PEPPER = Constants.expoConfig?.extra?.pepper
const PEPPERONY = Constants.expoConfig?.extra?.pepperony

export const createHash = async (password: string) => {
    const combinedPassword = `${SALT}${password}${PEPPER}`
    const hashedPassword = Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, combinedPassword)
    return hashedPassword
}

export const compareHash = async (password: string, hashedPassword: string) => {
    const hashedInputedPassword = await createHash(password)
    const comparedPassword = hashedInputedPassword === hashedPassword
    return comparedPassword
}

export const generateTokenHash = async ({ email, username }: { email: string; username: string }) => {
    const combinedToken = `${SALT}${email}${PEPPER}${username}`
    const token = await createHash(combinedToken)
    return token
}

export const verifyTokenHash = async ({ token, email, username }: { token: string; email: string; username: string }) => {
    const combinedToken = `${SALT}${email}${PEPPER}${username}`
    const hashedToken = await createHash(combinedToken)
    const verifyToken = token === hashedToken
    return verifyToken
}

export const encryptWithAes = (valueToEncrypt: string) => {
    return CryptoJS.AES.encrypt(valueToEncrypt, PEPPERONY).toString()
}

export const decryptWithAes = (valueToDecrypt: string) => {
    return CryptoJS.AES.decrypt(valueToDecrypt, PEPPERONY).toString(CryptoJS.enc.Utf8)
}
