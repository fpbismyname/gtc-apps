import useUser from '../Redux/useUser'
import { useNotify } from '../Redux/useNotify'
import useAuthentication from '../Database/Authentication'
import { AuthType } from '~/src/types/databaseType/AuthType'
import useAccount from '../Database/Account'
import constants from 'expo-constants'
import bcrypt from 'react-native-bcrypt'
import * as Crypto from 'expo-crypto'

const useAuth = () => {
    // Get State and Reducer Redux
    const { setNotifyMessage } = useNotify()
    // Manage user localstorage
    const { setUser, unsetUser } = useUser()
    // Manage Auth user
    const { addAuth, getAuth } = useAuthentication()
    // Manage Account user
    const { addAccount } = useAccount()

    // Hash password
    const createPassword = async (password: string = '') => {
        const hashed_password = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password)
        return hashed_password
    }
    // Compare password
    const comparePassword = async (password: string = '', hashed_password: string = '') => {
        const savedPass = hashed_password
        const inputPass = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password)
        return inputPass === savedPass ? true : false
    }

    // SignUp Method
    const authSignUp = async (values: Partial<AuthType>) => {
        try {
            const { password, isActive, role, ...data } = values
            const hashedPassword = await createPassword(password)
            const auth_data = await addAuth({
                ...data,
                password: hashedPassword
            })
            if (auth_data.added) {
                const Account = await addAccount({
                    user_id: auth_data.id
                })
                if (Account) setUser({ user_id: auth_data.id })
            }
        } catch (err: any) {
            setNotifyMessage(err.code)
            console.log(err)
        }
    }

    // SignIn Method
    const authSignIn = async (values: Partial<AuthType>) => {
        try {
            setNotifyMessage('loading')
            const dataInput = values
            await getAuth(
                {
                    email: dataInput.email || '',
                    password: dataInput.password || ''
                },
                async (data) => {
                    if (data) {
                        const checkPass = await comparePassword(dataInput.password, data.password)
                        if (checkPass) {
                            if (!data.id) return null
                            setUser({ user_id: data.id })
                        } else {
                            setNotifyMessage('auth/invalid-credential')
                        }
                    }
                    if (!data) setNotifyMessage('auth/invalid-credential')
                }
            )
        } catch (err: any) {
            setNotifyMessage(err.code)
            // console.log(err)
        }
    }

    // SignOut Method
    const authSignOut = () => {
        try {
            // setNotifyMessage('loading')
            unsetUser()
            setNotifyMessage('auth/signOut')
        } catch (err: any) {
            setNotifyMessage(err.code)
            // console.log(err)
        }
    }

    // Return Method Auth
    return { authSignUp, authSignIn, authSignOut }
}

export default useAuth
