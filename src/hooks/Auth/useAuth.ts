import useUser from '../User/useUser'
import useAccount from '../Database/Account/useAccount'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'
import { auth } from '../../utils/firebase/firebase'
import { useNotify } from '../Notify/useNotify'
import { Account } from '~/src/types/accountType/Account'
import { User } from '~/src/types/userType/User'
import useMember from '../Database/Member/useMember'
import { AddMembership } from '~/src/types/memberType/Member'

const useAuth = () => {
    // Get State and Reducer Redux
    const { setNotifyMessage } = useNotify()
    // Manage user data
    const { setUser, unsetUser } = useUser()
    // Manage member data
    const { addMember } = useMember()

    // Get account database Firebase
    const { addAccount, getAccount } = useAccount()

    // SignUp Method
    const authSignUp = async (values: Partial<Account>) => {
        try {
            setNotifyMessage('loading')
            // Get Data
            const { password, ...data } = values
            // account check
            const { user } = await createUserWithEmailAndPassword(auth, data.email || '', password || '')
            if (user) {
                // Get UID user
                const userUID = user.uid
                // set Data User to save
                const accountData: Partial<User> = {
                    user_uid: userUID,
                    user_information: {
                        ...data,
                        isActive: true
                    }
                }
                const memberData: AddMembership = {
                    type: 'new_user',
                    user_uid: userUID
                }
                // set user info to local storage
                setUser({ user_uid: userUID })
                // Input data user to accounts on firestore & set member information
                await addAccount(accountData)
                await addMember(memberData)
                // complete the loading
                setNotifyMessage('reset')
            }
        } catch (err: any) {
            setNotifyMessage(err.code)
        }
    }

    // SignIn Method
    const authSignIn = async (values: Partial<Account>) => {
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
                        // set Data User to save
                        const dataUser: Partial<User> = {
                            user_uid: userUID,
                            user_information: {
                                email: data.email
                            }
                        }
                        // Get data user
                        const account = await getAccount(
                            {
                                user_information: {
                                    email: dataUser.user_information?.email
                                }
                            },
                            'user_infomation'
                        )
                        if (!account) throw new Error()
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
