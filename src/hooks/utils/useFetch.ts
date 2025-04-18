import { useFocusEffect } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { DocumentDataWithID } from '~/src/types/Firebase/DataTypeFirebase'

const useFetch = (fetchUsing: 'useEffect' | 'useFocusEffect', method: () => Promise<DocumentDataWithID | DocumentDataWithID[] | undefined>) => {
    const [datas, setDatas] = useState<DocumentDataWithID[] | DocumentDataWithID | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchData = async () => {
        setIsLoading(true)
        await method()
            .then((doc) => {
                if (doc?.length > 1) setDatas(doc || [])
                if (doc?.length <= 1) setDatas(doc?.shift())
            })
            .finally(() => setIsLoading(false))
    }

    if (fetchUsing === 'useEffect') {
        useEffect(() => {
            fetchData()
        }, [])
    }
    if (fetchUsing === 'useFocusEffect') {
        useFocusEffect(
            useCallback(() => {
                fetchData()
            }, [])
        )
    }

    return { datas, isLoading }
}

export default useFetch
