import { addDoc, collection as collect, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { AddCollection, DeleteCollection, EditCollection, GetCollection } from '~/src/types/firebaseType/Firebase'
import { useNotify } from '../Redux/useNotify'
import { db } from '~/src/utils/firebase/firebase'
const useFirebase = () => {
    // Set Notify message
    const { setNotifyMessage } = useNotify()
    // Add collection data
    const addCollectionData = async ({ collection }: Partial<AddCollection>) => {
        try {
            if (!collection) return { id: null, added: false }
            if (!collection.doc_id) {
                const collects = collect(db, collection.col_name)
                const data = await addDoc(collects, collection.doc_data)
                return { id: data.id, added: true }
            } else {
                const collects = doc(db, collection.col_name, collection.doc_id)
                await setDoc(collects, collection.doc_data)
                return { id: null, added: true }
            }
        } catch (err: any) {
            setNotifyMessage(err.code)
            // console.log(err)
            return { id: null, added: false }
        }
    }
    // Get collection data
    const getCollectionData = async ({ collection }: Partial<GetCollection>) => {
        try {
            let queryData
            if (!collection) return { id: null, data: null }
            // queryCheck logic
            if (collection.doc_id) {
                queryData = doc(db, collection.col_name, collection.doc_id)
                const response = await getDoc(queryData)
                return { id: response.id, data: response.data() }
            } else {
                const docRef = collect(db, collection.col_name)
                if (collection.query_data && collection.query_data.length > 0) {
                    queryData = query(docRef, ...collection.query_data.map((q) => where(q.field, q.operator, q.value)))
                } else {
                    queryData = docRef
                }
                const response = await getDocs(queryData)
                return { data: response.docs.map((doc) => ({ id: doc.id, ...doc.data() })) }
            }
        } catch (err: any) {
            setNotifyMessage(err.code)
            // console.log(err)
            return { id: null, data: null }
        }
    }
    // Edit collectiondata
    const editCollectionData = async ({ collection }: Partial<EditCollection>) => {
        try {
            if (!collection) return false
            const docRef = doc(db, collection.col_name, collection.doc_id)
            if (collection.merge) {
                await setDoc(docRef, collection.doc_data, { merge: true })
            } else {
                await updateDoc(docRef, collection.doc_data)
            }
            return true
        } catch (err: any) {
            setNotifyMessage(err.code)
            console.log(err)
            return false
        }
    }
    // Delete collection Data
    const deleteCollectionData = async ({ collection }: Partial<DeleteCollection>) => {
        try {
            if (!collection) return false
            const docRef = doc(db, collection.col_name, collection.doc_id)
            await deleteDoc(docRef)
            return true
        } catch (err: any) {
            setNotifyMessage(err.code)
            console.log(err)
            return false
        }
    }
    return { addCollectionData, getCollectionData, editCollectionData, deleteCollectionData }
}

export default useFirebase
