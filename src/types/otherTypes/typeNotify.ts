import { ToastType } from 'react-native-toast-message'

export type notifyMessage =
    | 'loading'
    | 'reset'
    // Signup
    | 'auth/signUp-success'
    | 'auth/signUp-failed'
    | 'auth/email-already-in-use'
    // SignIn
    | 'auth/invalid-credential'
    | 'auth/user-disabled'
    // Signout
    | 'auth/signOut'
    // Others
    | 'auth/empty-data'
    | 'auth/too-many-requests'

export interface notifyInterface {
    loading?: boolean
    message?: string | null
    type?: ToastType | null
}
