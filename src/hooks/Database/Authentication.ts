import { GetCollection } from '~/src/types/firebaseType/Firebase'
import useFirebase from '../Firebase/useFirebase'
import { AuthType } from '~/src/types/databaseType/AuthType'
import { useNotify } from '../Redux/useNotify'
import { collection, doc, DocumentData, onSnapshot } from 'firebase/firestore'
import { db } from '~/src/utils/firebase/firebase'
import { AuthSignIn } from '~/src/types/authType/authType'

const collection_name = 'Authentication'

const useAuthentication = () => {
    // Get firebase crud
    const { getCollectionData, addCollectionData } = useFirebase()
    // Get notify system
    const { setNotifyMessage } = useNotify()

    const addAuth = async ({ email = '', isActive = true, password = '', phone_number = '', role = 'new_user', username = '' }: Partial<AuthType>) => {
        try {
            setNotifyMessage('loading')
            const data: AuthType = { email, isActive, password, phone_number, role, username }
            const checkEmail = await checkEmailDuplication(data.email)
            if (checkEmail) {
                setNotifyMessage('auth/email-already-in-use')
                return { id: null, added: false }
            } else {
                const { id } = await addCollectionData({
                    collection: {
                        col_name: collection_name,
                        doc_data: data
                    }
                })
                setNotifyMessage('reset')
                return { id: id, added: true }
            }
        } catch (err: any) {
            // console.log(err)
            return { id: null, added: false }
        }
    }
    // Get auth user
    const getAuth = async ({ email = '', password = '' }: AuthSignIn, callback: (exist: AuthType | null) => void) => {
        try {
            setNotifyMessage('loading')
            const datas: AuthSignIn = { email, password }
            const { data } = await getCollectionData({
                collection: {
                    col_name: collection_name,
                    query_data: [
                        {
                            field: 'email',
                            operator: '==',
                            value: datas.email
                        }
                    ]
                }
            })
            setNotifyMessage('reset')
            const user_auth = data?.shift()
            return callback(user_auth)
        } catch (err: any) {
            callback(null)
        }
    }
    // Check email in used
    const checkEmailDuplication = async (email: string) => {
        try {
            const prepareData: Partial<GetCollection> = {
                collection: {
                    col_name: collection_name,
                    query_data: [
                        {
                            field: 'email',
                            operator: '==',
                            value: email
                        }
                    ]
                }
            }
            const data = await getCollectionData(prepareData)
            if (data?.toString() !== '') {
                return true
            } else {
                return false
            }
        } catch (err: any) {
            return true
        }
    }
    // Check user
    const checkUserAvailable = (user_id: string | null, callback: (exist: DocumentData | null) => void) => {
        if (!user_id) {
            callback(null)
            return () => {}
        }
        const collect = doc(db, collection_name, user_id)
        const unsubscribe = onSnapshot(
            collect,
            (datas) => {
                const { password, ...data }: AuthType = datas.data() as AuthType
                callback({ data })
            },
            (error) => {
                callback(null)
            }
        )
        return unsubscribe
    }

    return { addAuth, checkEmailDuplication, checkUserAvailable, getAuth }
}

export default useAuthentication
