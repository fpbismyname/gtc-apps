import { useDispatch } from 'react-redux'
import { AppDispatch } from '../utils/redux/store'
import { setNotify } from '../utils/redux/slices/notifySlice'

type notifyType =
  | 'loading'
  | 'reset'
  | 'auth/signUp-success'
  | 'auth/invalid-email'
  | 'auth/empty-data'
  | 'auth/email-already-in-use'
  | 'auth/invalid-credential'
  | 'auth/weak-password'
  | 'auth/user-disabled'

export const useNotify = () => {
  const dispatch = useDispatch<AppDispatch>()
  const notifyMessage = (message: notifyType) => {
    const messages = message

    switch (messages) {
      // Sign Up Notify
      case 'auth/invalid-email':
        dispatch(
          setNotify({
            message: 'Format email kurang tepat.',
            type: 'warning',
            loading: false,
          }),
        )
        break
      case 'auth/weak-password':
        dispatch(
          setNotify({
            message: 'Password terlalu lemah, cobalah password yang lain.',
            type: 'warning',
            loading: false,
          }),
        )
        break
      case 'auth/empty-data':
        dispatch(
          setNotify({
            message: 'Semua data kolom wajib di isi.',
            type: 'warning',
            loading: false,
          }),
        )
        break
      case 'auth/email-already-in-use':
        dispatch(
          setNotify({
            message: 'Email sudah terdaftar, cobalah email yang lain.',
            type: 'warning',
            loading: false,
          }),
        )
        break

      // SignIn message
      case 'auth/invalid-credential':
        dispatch(
          setNotify({
            message: 'Kombinasi email dan password salah.',
            type: 'warning',
            loading: false,
          }),
        )
        break

      // User Disable
      case 'auth/user-disabled':
        dispatch(
          setNotify({
            message: 'Akun belum aktif silahkan hubungi admin untuk mengakses modul e-learning',
            type: 'warning',
            loading: false,
          }),
        )
        break
      // Default Message
      case 'loading':
        dispatch(
          setNotify({
            message: '',
            type: '',
            loading: true,
          }),
        )
        break
      case 'reset':
        dispatch(
          setNotify({
            message: '',
            type: '',
            loading: false,
          }),
        )
        break
      default:
        dispatch(
          setNotify({
            message: `Terjadi Kesalahan : ${message}`,
            type: 'danger',
            loading: false,
          }),
        )
        break
    }
  }

  return { notifyMessage }
}
