import { userData } from '../User/User'

export interface account {
    userUID: string
    userToken: string
    userData: userData
    userDataPrivacy: {
        username: string
        phone_number: number
        email: string
    }
}
