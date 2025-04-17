import { useNotify } from '~/src/store/useNotify'
import { useUsers } from '~/src/store/useUsers'
import { SignInData, SignUpData } from '~/src/types/Auth/AuthType'
import useCollection from '../Firebase/useCollection'
import { createHash, generateTokenHash, compareHash, verifyTokenHash } from '~/src/utils/encryptUtility'
import { Account } from '~/src/types/Firebase/Account'
import { textMessages } from '~/src/constants/textMessages'

const useAuth = () => {
    // getNotify data
    const { states: notify, action: actNotify } = useNotify()
    // getUser ID data
    const { action: actUserID } = useUsers()
    // Account Collection
    const { action: actAccount } = useCollection('Account')

    // Sign In
    const signInAccount = async (values: SignInData) => {
        actNotify.setNotifyValue({
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
            const Account = await actAccount
                .getData({
                    query: { field: 'authentication.password', operator: '==', value: HashedInputedPassword }
                })
                .then((doc) => doc?.shift() as Account)
            if (!Account) throw Error(textMessages.wrongPassword)
            IDUser = Account.id || null
        } catch (err) {
            if (err instanceof Error) {
                actNotify.setNotifyValue({
                    isLoading: false,
                    message: err.message,
                    type: 'error'
                })
            }
        } finally {
            actNotify.clearNotify()
            actUserID.setUserID(IDUser)
        }
    }
    // Sign Up
    const signUpAccount = async (values: SignUpData) => {
        actNotify.setNotifyValue({
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
                        allowed_module: ['free'],
                        expiration_date: null
                    },
                    role: 'user'
                }
            }
            const { id } = await actAccount.addData(prepareData)
            IDUser = id
        } catch (err: any) {
            if (err instanceof Error)
                actNotify.setNotifyValue({
                    isLoading: false,
                    message: err.message,
                    type: 'error'
                })
        } finally {
            actUserID.setUserID(IDUser)
            actNotify.clearNotify()
        }
    }
    // Sign out
    const signOutAccount = () => {
        try {
            actNotify.setNotifyValue({
                isLoading: true
            })
            actUserID.deleteUserID()
        } catch (err: any) {
            actNotify.setNotifyValue(err)
        } finally {
            actNotify.clearNotify()
        }
    }

    // Check Duplication Email
    const checkEmailExisted = async (email: string) => {
        const checkEmail = await actAccount.getData({
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
