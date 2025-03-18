import { createUserWithEmailAndPassword } from '@firebase/auth'
import { signInInterface, signUpInterface } from '../../types/AuthInterface'
import { auth } from '../../utils/firebase/firebase'
import { useNotify } from '../Notify/useNotify'
import useUser from '../User/useUser'
import useAccount from '../Database/Account/useAccount'

const useAuth = () => {
    // Get State and Reducer Redux
    const { setNotifyMessage } = useNotify()
    const { setUser, unsetUser } = useUser()

    // Get account database Firebase
    const { addAccount } = useAccount()

    // SignUp Method
    const authSignUp = async (values: any) => {
        try {
            // Get Data
            const data: signUpInterface = values
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password)
            // Check Signin Process
            if (user) {
                // Get Token JWT & user UID
                const tokenUser = await user.getIdToken()
                const userId = user.uid
                // Check get token process
                if (tokenUser) {
                    // set user info to local storage
                    setUser({
                        user: {
                            userUID: userId,
                            userToken: tokenUser
                        }
                    })
                    // Input data user to accounts on firestore
                    await addAccount({
                        userUID: userId,
                        userToken: tokenUser,
                        userDataPrivacy: {
                            ...values
                        }
                    })
                }
            }
        } catch (err: any) {
            setNotifyMessage(err.code)
        }
    }

    // SignIn Method
    const authSignIn = (values: any) => {
        const data: signInInterface = values
        console.log(values)
    }
    return { authSignUp, authSignIn }
}

export default useAuth
