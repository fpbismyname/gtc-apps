import { useFocusEffect } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { DocumentDataWithID } from '~/src/types/Firebase/DataTypeFirebase'

const useFetch = (fetchUsing: 'useEffect' | 'useFocusEffect' | 'withUnsubscribe', method: () => Promise<DocumentDataWithID | DocumentDataWithID[] | undefined>) => {
    const [datas, setDatas] = useState<DocumentDataWithID[] | DocumentDataWithID | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchData = async () => {
        setIsLoading(true)
        Promise.resolve(method() as Promise<DocumentDataWithID | DocumentDataWithID[] | undefined>)
            .then((doc) => {
                if (doc?.length > 1) setDatas((doc as DocumentDataWithID | DocumentDataWithID[]) || null)
                if (doc?.length <= 1) setDatas(doc?.shift() || null)
            })
            .finally(() => setIsLoading(false))
    }

    if (fetchUsing === 'useEffect') {
        useEffect(() => {
            if (fetchData) {
                fetchData()
            }
        }, [])
    }
    if (fetchUsing === 'useFocusEffect') {
        useFocusEffect(
            useCallback(() => {
                if (fetchData) fetchData()
            }, [])
        )
    }

    return { datas, isLoading }
}

export default useFetch
