import { DocumentData } from 'firebase/firestore'

export interface DocumentDataWithID extends DocumentData {
    id: string
}
