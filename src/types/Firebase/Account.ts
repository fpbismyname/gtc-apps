import { SignUpData } from '../Auth/AuthType'

export interface Account {
    id?: string
    authentication: SignUpData
    token: string
    information: {
        memberships: {
            expiration_date: string | null
            allowed_module: tierMembership[]
        }
        role: Roles
    }
}
export type Roles = 'user' | 'student' | 'admin' | 'teacher'
export type tierMembership = 'free' | 'tier-1' | 'tier-2' | 'student'
