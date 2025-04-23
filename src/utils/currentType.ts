import { IconNameType } from '../constants/useTheme'
import { Roles } from '../types/Firebase/Account'

export const currentTypeRoles = (role?: Roles) => {
    let Role = { name: '', icon: '' }
    if (role) {
        switch (role) {
            case 'admin':
                Role = {
                    name: 'Admin',
                    icon: 'shield-account'
                }
                break
            case 'student':
                Role = {
                    name: 'Pelajar',
                    icon: 'school'
                }
                break
            case 'teacher':
                Role = {
                    name: 'Sensei',
                    icon: 'account-tie-hat'
                }
                break
            case 'user':
                Role = {
                    name: 'Reguler',
                    icon: 'account-circle'
                }
                break
            case 'tier-1':
                Role = {
                    name: 'Premium',
                    icon: 'star' as IconNameType
                }
                break
            case 'tier-2':
                Role = {
                    name: 'Master',
                    icon: 'chess-queen' as IconNameType
                }
                break
            default:
                Role = Role
                break
        }
    }
    return Role
}
