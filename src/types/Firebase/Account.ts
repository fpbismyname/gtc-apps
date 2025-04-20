import { SignUpData } from '../Auth/AuthType'
import { Module } from './MasterData/Module'

export interface Account {
    id?: string
    authentication: SignUpData
    token: string
    information: {
        memberships: {
            expiration_date: string | null
            allowed_module?: Module[]
        }
        role: Roles
        profile_picture: string | null
    }
}
export type Roles = 'user' | 'student' | 'admin' | 'teacher' | 'tier-1' | 'tier-2'
