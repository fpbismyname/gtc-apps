import { DocumentData } from 'firebase/firestore'
import { AuthType } from '../databaseType/AuthType'

export type StackParamList = {
    TabLayouts: {
        data_user: Partial<AuthType> | null
    }
}

export type TabsParamList = {
    Profile: {
        data_user: Partial<AuthType> | null
    }
    Materi: {
        data: DocumentData | null
    }
    Home: {
        data: DocumentData | null
    }
}
