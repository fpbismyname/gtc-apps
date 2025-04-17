import * as Crypto from 'expo-crypto'
import { SignUpData } from '../types/Auth/AuthType'

const SALT = process.env.EXPO_PUBLIC_SALT_HASH
const PEPPER = process.env.EXPO_PUBLIC_PEPPER

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
