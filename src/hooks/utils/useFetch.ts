import { useFocusEffect } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { DocumentDataWithID } from '~/src/types/Firebase/DataTypeFirebase'

const useFetch = (fetchUsing: 'useEffect' | 'useFocusEffect', method: () => Promise<DocumentDataWithID | DocumentDataWithID[] | undefined>) => {
    const [datas, setDatas] = useState<DocumentDataWithID[] | DocumentDataWithID | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchData = async () => {
        setIsLoading(true)
        Promise.resolve(method() as Promise<DocumentDataWithID | DocumentDataWithID[] | undefined>)
            .then((doc) => {
                if (Array.isArray(doc)) {
                    setDatas(doc.length > 1 ? (doc as DocumentDataWithID[]) : (doc[0] as DocumentDataWithID))
                } else {
                    setDatas(doc as DocumentDataWithID)
                }
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
