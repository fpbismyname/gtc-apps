import { Account } from '~/src/types/databaseType/AccountType'
import useFirebase from '../Firebase/useFirebase'
import { AuthSignIn } from '~/src/types/authType/authType'

const collection_name = 'Account'

const useAccount = () => {
    const { addCollectionData, getCollectionData } = useFirebase()
    const addAccount = async ({ user_id, completed_modules = [], memberships = { expired_at: '', memberships_type: '' } }: Partial<Account>) => {
        try {
            const data = { user_id, completed_modules, memberships }
            const { id } = await addCollectionData({ collection: { col_name: collection_name, doc_data: data, doc_id: user_id } })
            if (id?.toString() !== '') {
                return true
            } else {
                return false
            }
        } catch (err: any) {
            return false
        }
    }
    const getAccount = async ({ email }: Partial<AuthSignIn>) => {
        try {
            const dataInput = { email }
            const { data } = await getCollectionData({
                collection: {
                    col_name: collection_name,
                    query_data: [
                        {
                            field: 'email',
                            operator: '==',
                            value: dataInput.email
                        }
                    ]
                }
            })
            const datas: Account = data?.shift()
            return { data: datas }
        } catch (err) {
            return { data: null }
        }
    }
    return { addAccount, getAccount }
}
export default useAccount
