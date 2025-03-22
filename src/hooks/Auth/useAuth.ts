import useUser from '../User/useUser'
import useAccount from '../Database/Account/useAccount'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'
import { auth } from '../../utils/firebase/firebase'
import { useNotify } from '../Notify/useNotify'
import { account } from '~/src/types/Account/account'
import { UserInformation } from '~/src/types/User/User'

const useAuth = () => {
    // Get State and Reducer Redux
    const { setNotifyMessage } = useNotify()
    const { setUser, unsetUser } = useUser()

    // Get account database Firebase
    const { addAccount, getAccount } = useAccount()

    // SignUp Method
    const authSignUp = async (values: Partial<account>) => {
        try {
            setNotifyMessage('loading')
            // Get Data
            const data = values
            // account check
            const { user } = await createUserWithEmailAndPassword(auth, data.email || '', data.password || '')
            if (user) {
                const userUID = user.uid // Get UID user
                const tokenUser = await user.getIdToken() // Get Token JWT & user UID
                // Prepare data user
                const dataUser: Partial<UserInformation> = {
                    user_uid: userUID,
                    user_information: {
                        email: data.email || '',
                        phone_number: data.phone_number || '',
                        username: data.username || ''
                    },
                    user_data: {
                        membership: 'new_user',
                        completed_modules: [],
                        expired_at: ''
                    }
                }
                // set user info to local storage
                setUser({
                    ...dataUser,
                    user_token: tokenUser
                })
                // Input data user to accounts on firestore
                await addAccount(dataUser)
                // complete the loading
                setNotifyMessage('reset')
            }
        } catch (err: any) {
            setNotifyMessage(err.code)
        }
    }

    // SignIn Method
    const authSignIn = async (values: Partial<account>) => {
        try {
            setNotifyMessage('loading')
            const data = values
            if (data) {
                const { user } = await signInWithEmailAndPassword(auth, data.email || '', data.password || '')
                if (user) {
                    // Get Token JWT & user UID
                    const userUID = user.uid
                    const tokenUser = await user.getIdToken()
                    // Check get token process
                    if (tokenUser) {
                        // Get data user
                        const account = await getAccount(data)
                        if (!account) throw new Error()
                        // set Data User to save
                        const dataUser: Partial<UserInformation> = {
                            ...account['0'],
                            user_uid: userUID,
                            user_token: tokenUser
                        }
                        setUser(dataUser)
                        // complete the loading
                        setNotifyMessage('reset')
                    }
                }
            }
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
