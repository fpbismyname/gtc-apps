import { AddMembership, Memberships } from '~/src/types/memberType/Member'
import { useNotify } from '../../Notify/useNotify'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '~/src/utils/firebase/firebase'

const useMember = () => {
    const { setNotifyMessage } = useNotify()
    const addMember = async (member_data: AddMembership) => {
        try {
            const collect = doc(db, 'accounts', member_data.user_uid)
            const dataMembership: Memberships = {
                memberships: {
                    completed_module: [],
                    expired_at: null,
                    membership_type: member_data.type
                }
            }
            await setDoc(collect, dataMembership, { merge: true })
            return true
        } catch (err: any) {
            setNotifyMessage(err.code)
            console.log(err)
            return false
        }
    }
    return { addMember }
}
export default useMember
