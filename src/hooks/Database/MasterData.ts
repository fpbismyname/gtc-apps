import { MasterDataType } from '~/src/types/databaseType/MasterDataType'
import { useState } from 'react'
import { doc, DocumentData, onSnapshot } from 'firebase/firestore'
import { db } from '~/src/utils/firebase/firebase'

const collection_name = 'MasterData'

const useMasterData = () => {
    // Get Master Data
    const getMasterData = (typeData: 'institution_information', callback: (data: DocumentData | null) => void) => {
        const collect = doc(db, collection_name, typeData)
        const unsubscribe = onSnapshot(collect, (data) => {
            if (data) {
                callback({ ...data.data() })
            }
        })
        return unsubscribe
    }

    return { getMasterData }
}

export default useMasterData
