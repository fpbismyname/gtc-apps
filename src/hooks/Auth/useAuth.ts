import { useNotify } from '~/src/store/useNotify'
import { useUsers } from '~/src/store/useUsers'
import { SignInData, SignUpData } from '~/src/types/Auth/AuthType'
import useCollection from '../Firebase/useCollection'
import { createHash, generateTokenHash, compareHash, verifyTokenHash } from '~/src/utils/encryptUtility'
import { Account } from '~/src/types/Firebase/Account'
import { textMessages } from '~/src/constants/textMessages'
import { router } from 'expo-router'

const useAuth = () => {
    // getNotify data
    const { states: notify, clearNotify, setNotifyValue } = useNotify()
    // getUser ID data
    const { setUserID, deleteUserID } = useUsers()
    // Account Collection
    const { getData, addData } = useCollection('Account')

    // Sign In
    const signInAccount = async (values: SignInData) => {
        setNotifyValue({
            isLoading: true
        })
        let IDUser = null
        try {
            const checkEmail = (await checkEmailExisted(values.email)) as Account
            if (!checkEmail) throw Error(textMessages.wrongPassword)
            const comparePassword = await compareHash(values.password, checkEmail.authentication.password)
            if (!comparePassword) throw Error(textMessages.wrongPassword)
            const compareToken = await verifyTokenHash({
                token: checkEmail.token,
                email: checkEmail.authentication.email,
                username: checkEmail.authentication.username
            })
            if (!compareToken) throw Error('Token')
            const HashedInputedPassword = await createHash(values.password)
            const Account = await getData({
                query: { field: 'authentication.password', operator: '==', value: HashedInputedPassword }
            }).then((doc) => doc?.shift() as Account)
            if (!Account) throw Error(textMessages.wrongPassword)
            IDUser = Account.id || null
            router.replace('/(tabs)/')
        } catch (err) {
            if (err instanceof Error) {
                setNotifyValue({
                    isLoading: false,
                    message: err.message,
                    type: 'error'
                })
            }
        } finally {
            clearNotify()
            setUserID(IDUser)
        }
    }
    // Sign Up
    const signUpAccount = async (values: SignUpData) => {
        setNotifyValue({
            isLoading: true
        })
        let IDUser = null
        try {
            const checkEmail = await checkEmailExisted(values.email)
            if (checkEmail) throw new Error(textMessages.emailTaken)
            const createdPassword = await createHash(values.password)
            const createdToken = await generateTokenHash({ email: values.email, username: values.username })
            const prepareData: Account = {
                authentication: {
                    username: values.username,
                    email: values.email,
                    phone_number: values.phone_number,
                    password: createdPassword
                },
                token: createdToken,
                information: {
                    memberships: {
                        allowed_module: [],
                        expiration_date: null
                    },
                    role: 'user',
                    profile_picture: ''
                }
            }
            const { id } = await addData(prepareData)
            IDUser = id
            router.replace('/(tabs)/')
        } catch (err: any) {
            if (err instanceof Error)
                setNotifyValue({
                    isLoading: false,
                    message: err.message,
                    type: 'error'
                })
        } finally {
            clearNotify()
            setUserID(IDUser)
        }
    }
    // Sign out
    const signOutAccount = () => {
        try {
            setNotifyValue({
                isLoading: true
            })
            deleteUserID()
        } catch (err: any) {
            if (err instanceof Error) {
                setNotifyValue({
                    isLoading: false,
                    message: err.message,
                    type: 'error'
                })
            }
        } finally {
            clearNotify()
            router.replace('/(tabs)/')
        }
    }

    // Check Duplication Email
    const checkEmailExisted = async (email: string) => {
        const checkEmail = await getData({
            query: { field: 'authentication.email', operator: '==', value: email }
        })
        return checkEmail?.shift()
    }

    // action
    const action = {
        signInAccount,
        signUpAccount,
        signOutAccount
    }

    // states
    const states = {
        isLoading: notify.isLoading
    }
    return { states, action }
}
export default useAuth
