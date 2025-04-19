import { addDoc, collection as collect, doc, getDoc, getDocs, where } from 'firebase/firestore'
import { db } from '~/src/services/firebase'
import { WhereFilterOp, query as q } from 'firebase/firestore'
import { useState } from 'react'

export type collectionDocsType = string
export type queryType = { field: any; operator: WhereFilterOp; value: any } | null

const useCollection = (collectionPath: string) => {
    // Loading collection
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // Error
    const [isError, setIsError] = useState<any>()

    // Fetching All Data
    const getData = async ({ queryByDocId, query }: { query?: queryType; queryByDocId?: string | null } = {}) => {
        // SetLoading
        setIsLoading(true)
        // Collection Reference
        const colRef = collect(db, collectionPath)
        try {
            if (query && !queryByDocId) {
                const queriesSnapshot = q(colRef, where(query.field, query.operator, query.value))
                const { docs } = await getDocs(queriesSnapshot)
                if (!docs) return []
                return docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            }
            if (!query && !queryByDocId) {
                const { docs } = await getDocs(colRef)
                if (!docs) return []
                return docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            }
            if (queryByDocId && !query) {
                const docRef = doc(db, collectionPath, queryByDocId)
                const snapshot = await getDoc(docRef)
                if (!snapshot.exists()) return []
                return [{ id: snapshot.id, ...snapshot.data() }]
            }
        } catch (err) {
            setIsError(err)
        } finally {
            setIsLoading(false)
        }
    }

    // Adding data
    const addData = async (values?: any) => {
        try {
            setIsLoading(true)
            const colSnapshot = collect(db, collectionPath)
            const { id } = await addDoc(colSnapshot, values)
            return id ? { id: id } : { id: null }
        } catch (err) {
            setIsError(err)
            return { id: null }
        } finally {
            setIsLoading(false)
        }
    }
    // Editing Data
    const editData = async () => {
        // console.log('edit : ', data)
    }

    // Delete Data
    const deleteData = async () => {
        // console.log('delete:', data)
    }

    // CRUD Method
    const action = {
        editData,
        deleteData,
        addData,
        getData
    }
    const states = {
        isLoading,
        isError
    }

    return { states, ...action }
}

export default useCollection
