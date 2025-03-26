import { WhereFilterOp } from 'firebase/firestore'

export interface AddCollection {
    collection: {
        col_name: string
        doc_data?: any
        doc_id?: string | null
    }
}
export interface GetCollection {
    collection: {
        col_name: string
        doc_id?: string | null
        query_data?: [{ field: string; operator: WhereFilterOp; value: any }]
    }
}

export interface EditCollection {
    collection: {
        col_name: string
        doc_id: string
        doc_data: Partial<Record<string, any>>
        merge?: boolean
    }
}

export interface DeleteCollection {
    collection: {
        col_name: string
        doc_id: string
    }
}
