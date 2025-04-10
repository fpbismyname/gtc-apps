import { doc, DocumentData, onSnapshot } from 'firebase/firestore'
import { ListMasterData } from '~/src/types/databaseType/MasterDataType'
import { db } from '~/src/utils/firebase/firebase'

const collection_name = 'MasterData'

const useMasterData = () => {
    // Get Master Data
    const getMasterData = (typeData: ListMasterData, callback: (data: DocumentData | null) => void) => {
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
