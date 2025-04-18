import { collection as collect, doc, onSnapshot, where } from 'firebase/firestore'
import { db } from '~/src/services/firebase'
import { WhereFilterOp, query as q } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { DocumentDataWithID } from '~/src/types/Firebase/DataTypeFirebase'

export type collectionDocsType = string
export type queryType = { field: any; operator: WhereFilterOp; value: any } | null

const delayFetchTime = 600

const useCollectionRealTime = (collectionPath: string, { queryByDocId, query }: { query?: queryType; queryByDocId?: string }) => {
    // Datas collection
    const [datas, setDatas] = useState<DocumentDataWithID | DocumentDataWithID[] | null>(null)

    // Loading collection
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // Error
    const [isError, setIsError] = useState<any>()

    // Fetching All Data
    const getData = () => {
        // SetLoading
        setIsLoading(true)
        // Collection Reference
        const colRef = collect(db, collectionPath)
        let unsubscribe = null
        try {
            if (query && !queryByDocId) {
                const queriesSnapshot = q(colRef, where(query.field, query.operator, query.value))
                unsubscribe = onSnapshot(queriesSnapshot, (data) => {
                    if (!data.empty) {
                        const datas = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                        setDatas(datas)
                    } else {
                        setDatas(null)
                    }
                })
                return unsubscribe
            }
            if (!query && !queryByDocId) {
                unsubscribe = onSnapshot(colRef, (data) => {
                    if (!data.empty) {
                        const datas = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                        setDatas(datas)
                    } else {
                        setDatas(null)
                    }
                })
                return unsubscribe
            }
            if (queryByDocId && !query) {
                const docRef = doc(db, collectionPath, queryByDocId)
                unsubscribe = onSnapshot(docRef, (data) => {
                    if (data.exists()) {
                        setDatas({ id: data.id, ...data.data() })
                    } else {
                        setDatas(null)
                    }
                })
                return unsubscribe
            }
        } catch (err) {
            setIsError(err)
        } finally {
            setIsLoading(false)
        }
        return () => {}
    }

    // Real time data load
    useEffect(() => {
        if (query || queryByDocId) {
            const unsubscribe = getData()
            return () => {
                if (unsubscribe) unsubscribe()
            }
        }
    }, [])

    const states = {
        datas,
        isLoading,
        isError
    }

    return { ...states }
}

export default useCollectionRealTime
