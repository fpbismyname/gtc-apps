import { account } from '~/src/types/Account/account'
import { db } from '~/src/utils/firebase/firebase'
import { useNotify } from '~/src/hooks/Notify/useNotify'
import { addDoc, collection, DocumentData, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { UserInformation } from '~/src/types/User/User'

const useAccount = () => {
    const { setNotifyMessage } = useNotify()
    const addAccount = async (values: Partial<UserInformation>) => {
        try {
            const collect = collection(db, 'accounts')
            return (await addDoc(collect, values)) ? true : false
        } catch (err: any) {
            setNotifyMessage(err.code)
            // console.log(err)
            return false
        }
    }

    const getAccount = async (values: Partial<account>) => {
        try {
            const collect = collection(db, 'accounts')
            const queryData = values ? query(collect, where(`user_information.email`, '==', values.email)) : collect
            const { docs } = await getDocs(queryData)
            if (!docs) return null
            const data: DocumentData = docs.map((doc) => ({ ...doc.data() })).filter(Boolean)
            return data
        } catch (err: any) {
            setNotifyMessage(err.code)
            return null
        }
    }

    const checkAccount = (values: Partial<UserInformation>, callback: (exist: boolean) => void) => {
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

    const checkAuth = (callback: (exist: boolean) => void) => {
        try {
        } catch (err: any) {
            setNotifyMessage(err.code)
        }
    }

    return { addAccount, getAccount, checkAccount }
}

export default useAccount
