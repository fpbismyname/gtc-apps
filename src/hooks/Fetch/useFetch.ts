import { useEffect, useState } from 'react'
import useAuthentication from '../Database/Authentication'
import { DocumentData } from 'firebase/firestore'
import { AuthType } from '~/src/types/databaseType/AuthType'

const useFetch = (user_id: string | null) => {
    const [data_user, set_data_user] = useState<Partial<AuthType>>()
    const [loading_data, setLoading] = useState<boolean>(true)
    const { checkUserAvailable } = useAuthentication()
    useEffect(() => {
        const unsubscribe = checkUserAvailable(user_id, (exist) => {
            if (exist) {
                set_data_user(exist?.data)
                setLoading(false)
            }
        })
        return () => unsubscribe()
    }, [user_id])

    return { data_user, loading_data }
}

export default useFetch
