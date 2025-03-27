export interface AuthType {
    id?: string | null
    username: string
    email: string
    password: string
    phone_number: string
    role: 'student' | 'teacher' | 'admin' | 'new_user' | null
    isActive: boolean
}
