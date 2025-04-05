import { useEffect, useState } from 'react'
import { AuthType } from '~/src/types/databaseType/AuthType'
import useAuthentication from '../Database/Authentication'
import useMasterData from '../Database/MasterData'
import { MasterDataType } from '~/src/types/databaseType/MasterDataType'

const useFetch = (user_id: string | null) => {
    // Data user
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
        return () => {
            unsubscribe()
        }
    }, [])

    // masterData
    const [masterData, setMasterData] = useState<Partial<MasterDataType> | null>(null)
    const { getMasterData } = useMasterData()

    useEffect(() => {
        const unsubscribe = getMasterData('institution_information', (data) => {
            if (data) {
                setMasterData(data)
                setLoading(false)
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return { data_user, masterData, loading_data }
}

export default useFetch
