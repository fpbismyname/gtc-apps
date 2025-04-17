import { Roles, tierMembership } from '../types/Firebase/Account'

export const currentType = (role?: Roles, tierMembership?: tierMembership) => {
    if (role) {
        switch (role) {
            case 'admin':
                return 'Admin'
            case 'student':
                return 'Student'
            case 'teacher':
                return 'Sensei'
            case 'user':
                return 'User'
            default:
                return 'None'
        }
    }
    if (tierMembership) {
        switch (tierMembership) {
            case 'free':
                return 'Free'
            case 'tier-1':
                return 'Membership-1'
            case 'tier-2':
                return 'Membership-2'
            default:
                return 'None'
        }
    }
}
