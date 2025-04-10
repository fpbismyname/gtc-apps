import { Timestamp } from 'firebase/firestore'

export interface ModuleData {
    module: moduleInformation[]
    category_of_module: categoryOfModule[]
}

export type categoryOfModule = {
    category_name: string
    category_slug: string
    category_thumbnail: string
    created_at: Timestamp
}

export type moduleInformation = {
    module_name: string
    category_module: string
    module_thumbnail: string
    module_video: string
}
