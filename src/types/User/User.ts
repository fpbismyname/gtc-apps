// User Information

interface userDoneModule {
    idModule?: string[] | []
}

export interface userData {
    member?: 'new_user' | 'member_regular' | 'member_pro_1' | 'member_pro_2'
    lifeTime?: number | null
    doneModule?: userDoneModule
}

interface userObject {
    userUID?: string | null
    userToken?: string | null
    userData?: userData
}

export interface User {
    user: userObject
}
