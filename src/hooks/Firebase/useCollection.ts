import { addDoc, collection as collect, doc, getDoc, getDocs, updateDoc, deleteDoc, where } from 'firebase/firestore'
import { db } from '~/src/services/firebase'
import { WhereFilterOp, query as q } from 'firebase/firestore'
import { useState } from 'react'
import { compareHash, createHash } from '~/src/utils/encryptUtility'
import { useNotify } from '~/src/store/useNotify'

export type collectionDocsType = string
export type queryType = { field: any; operator: WhereFilterOp; value: any } | null

const useCollection = (collectionPath: string) => {
    // Notify data
    const { clearNotify, setNotifyValue } = useNotify()
    const [isLoading, setIsLoading] = useState<boolean>(false)

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
            if (err instanceof Error) {
                setNotifyValue({
                    message: err.message,
                    type: 'error'
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    // Adding data
    const addData = async (values?: any) => {
        if (!values) return { id: null }
        setIsLoading(true)
        try {
            const colSnapshot = collect(db, collectionPath)
            const { id } = await addDoc(colSnapshot, values)
            return id ? { id: id } : { id: null }
        } catch (err) {
            if (err instanceof Error) {
                setNotifyValue({ message: err.message, type: 'error' })
            }
            return { id: null }
        } finally {
            setIsLoading(false)
        }
    }

    // Editing Data
    const editData = async ({ id, field, values, type }: { id?: string; field?: string; values?: any; type: 'password' | 'text' }) => {
        if (!id || !values || !field) return false
        setIsLoading(true)
        try {
            if (type === 'password') {
                const oldPassword = values?.password
                const newPassword = values?.newPassword
                const hashedNewPassword = await createHash(newPassword)
                const preparedData = field
                    ? {
                          [field]: hashedNewPassword
                      }
                    : values
                const colRef = doc(db, collectionPath, id)
                const account = await getDoc(colRef)
                const userData = { ...account.data() }
                const checkPassword = await compareHash(oldPassword, userData?.authentication?.password)
                console.log(oldPassword, userData)
                if (!checkPassword) return false
                await updateDoc(colRef, preparedData)
                return true
            }
            if (type === 'text') {
                const preparedData = field
                    ? {
                          [field]: values
                      }
                    : values
                const colRef = doc(db, collectionPath, id)
                await updateDoc(colRef, preparedData)
                return true
            }
        } catch (err) {
            if (err instanceof Error) {
                setNotifyValue({ message: err.message, type: 'error' })
                return false
            }
        } finally {
            setIsLoading(false)
        }
    }

    // Delete Data
    const deleteData = async (id: string) => {
        setIsLoading(true)
        try {
            const colRef = doc(db, collectionPath, id)
            await deleteDoc(colRef)
            return true
        } catch (err) {
            if (err instanceof Error) {
                setNotifyValue({ message: err.message, type: 'error' })
                return false
            }
        } finally {
            setIsLoading(false)
        }
    }

    // CRUD Method
    const action = {
        editData,
        deleteData,
        addData,
        getData
    }

    const states = {
        isLoading
    }

    return { ...action, ...states }
}

export default useCollection
