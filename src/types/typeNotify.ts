export type notifyMessage =
    | 'loading'
    | 'reset'
    | 'auth/signUp-success'
    | 'auth/invalid-email'
    | 'auth/empty-data'
    | 'auth/email-already-in-use'
    | 'auth/invalid-credential'
    | 'auth/weak-password'
    | 'auth/user-disabled'
    | 'auth/signOut'
    | 'auth/too-many-requests'

export interface notifyInterface {
    loading?: boolean
    message?: string | null
    type?: 'success' | 'warning' | 'danger' | null
}
