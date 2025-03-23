import { notifyMessage } from '../../types/otherTypes/typeNotify'
import useRedux from '../Redux/useRedux'

export const useNotify = () => {
    // Get State Redux
    const { dispatch, notifyState, slicer } = useRedux()
    const { setNotify, unsetNotify } = slicer
    const { loading, message, type } = notifyState

    const setNotifyMessage = (message: notifyMessage) => {
        const messages = message

        switch (messages) {
            // Sign Up Notify
            case 'auth/signUp-failed':
                dispatch(
                    setNotify({
                        message: 'Gagal mencoba untuk SignUp, silahkan coba lagi nanti.',
                        loading: false,
                        type: 'warning'
                    })
                )
                break
            // email used
            case 'auth/email-already-in-use':
                dispatch(
                    setNotify({
                        message: 'Email sudah terdaftar, coba akun email lainnya.',
                        loading: false,
                        type: 'warning'
                    })
                )
                break
            // SignIn message
            case 'auth/invalid-credential':
                dispatch(
                    setNotify({
                        message: 'Kombinasi email/password tidak tepat.',
                        loading: false,
                        type: 'warning'
                    })
                )
                break
            // user disabled
            case 'auth/user-disabled':
                dispatch(
                    setNotify({
                        message: 'Akun belum aktif, silahkan hubungi admin.',
                        loading: false,
                        type: 'warning'
                    })
                )
                break
            // User Signout
            case 'auth/signOut':
                dispatch(
                    setNotify({
                        message: 'Keluar dari akun berhasil.',
                        loading: false,
                        type: 'success'
                    })
                )
                break
            // Others Use case
            // too many request
            case 'auth/too-many-requests':
                dispatch(
                    setNotify({
                        message: 'Terlalu banyak permintaaan, cobalah beberapa saat lagi.',
                        loading: false,
                        type: 'warning'
                    })
                )
                break
            // Loading
            case 'loading':
                dispatch(
                    setNotify({
                        message: null,
                        loading: true,
                        type: null
                    })
                )
                break
            // reset Message
            case 'reset':
                dispatch(unsetNotify())
                break
            default:
                dispatch(
                    setNotify({
                        message: message,
                        loading: false,
                        type: 'danger'
                    })
                )
                break
        }
    }

    return { setNotifyMessage, loading, message, type }
}
