export interface MasterDataType {
    institution_information: institutionType
}

export interface institutionType {
    name: string
    logo: string
    address: string
    phone_number: string
    website: string
    email: string
}
