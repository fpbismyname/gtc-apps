import { account } from '~/src/types/Account/account'
import { db } from '~/src/utils/firebase/firebase'
import { useNotify } from '~/src/hooks/Notify/useNotify'
import { addDoc, collection } from 'firebase/firestore'

const useAccount = () => {
    const { setNotifyMessage } = useNotify()
    const addAccount = async (values: Partial<account>) => {
        try {
            const collect = collection(db, 'accounts')
            await addDoc(collect, values)
        } catch (err: any) {
            setNotifyMessage(err.code)
        }
    }
    return { addAccount }
}

export default useAccount
