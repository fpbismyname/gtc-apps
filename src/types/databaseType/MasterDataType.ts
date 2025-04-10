export interface MasterDataType {
    institution_information: institutionType
}

export interface MasterDataDocs {
    doc_name: string
}

export type ListMasterData = 'institution_information' | 'module_data'

export interface institutionType {
    name: string
    logo: string
    address: string
    phone_number: string
    website: string
    email: string
}
