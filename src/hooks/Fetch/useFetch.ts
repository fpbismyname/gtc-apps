import { useEffect, useState } from 'react'
import useAuthentication from '../Database/Authentication'
import { DocumentData } from 'firebase/firestore'

const useFetch = (user_id: string | null) => {
    const [data_user, set_data_user] = useState<DocumentData>()
    const { checkUserAvailable } = useAuthentication()
    useEffect(() => {
        const unsubscribe = checkUserAvailable(user_id, (exist) => {
            if (exist) set_data_user(exist)
        })
        return () => unsubscribe()
    }, [])
    return { data_user }
}

export default useFetch
