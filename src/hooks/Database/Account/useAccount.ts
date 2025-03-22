import { db } from '~/src/utils/firebase/firebase'
import { useNotify } from '~/src/hooks/Notify/useNotify'
import { setDoc, collection, doc, DocumentData, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { User } from '~/src/types/userType/User'
import { getAuth } from 'firebase-admin/auth'

const useAccount = () => {
    const { setNotifyMessage } = useNotify()

    const addAccount = async (values: Partial<User>) => {
        try {
            const collect = doc(db, 'accounts', values.user_uid || '')
            await setDoc(collect, values, { merge: true })
            return true
        } catch (err: any) {
            setNotifyMessage(err.code)
            // console.log(err)
            return false
        }
    }

    const getAccount = async (values: Partial<User>, path: string) => {
        try {
            const collect = collection(db, 'accounts')
            const queryData = values ? query(collect, where(path, '==', values)) : collect
            const { docs } = await getDocs(queryData)
            if (!docs) return null
            const data: DocumentData = docs.map((doc) => ({ ...doc.data() })).filter(Boolean)
            return data
        } catch (err: any) {
            setNotifyMessage(err.code)
            return null
        }
    }

    const checkAccount = (values: Partial<User>, callback: (exist: boolean) => void) => {
        try {
            const collect = collection(db, 'accounts')
            const queryData = query(collect, where('user_uid', '==', values.user_uid))
            const unsubscribe = onSnapshot(queryData, (account) => {
                callback(!account.empty)
            })
            return unsubscribe
        } catch (err: any) {
            setNotifyMessage(err.code)
            return () => {}
        }
    }

    const deleteAccount = async (user_uid: string) => {
        try {
            await getAuth().deleteUser(user_uid)
            console.log(user_uid, ' : account deleted')
        } catch (err: any) {
            setNotifyMessage(err.code)
        }
    }

    return { addAccount, getAccount, checkAccount, deleteAccount }
}

export default useAccount
