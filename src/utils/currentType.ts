import { useTheme } from '../constants/useTheme'
import { Roles } from '../types/Firebase/Account'

export const currentTypeRoles = (role?: Roles) => {
    const { themeWithTransparent } = useTheme()
    let Role = {}
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
            default:
                Role = {}
                break
        }
    }
    return Role
}
