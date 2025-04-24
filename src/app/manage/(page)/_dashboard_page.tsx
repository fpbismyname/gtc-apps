import Text from '~/src/components/elements/Text'
import View from '~/src/components/elements/View'
import { useTheme } from '~/src/constants/useTheme'
import AccountPage from './_account_page'
import useAuth from '~/src/hooks/Auth/useAuth'
import { IconButton } from 'react-native-paper'
import InstitutionPage from './_institution_page'

const titleDashboardHeader: Record<string, string> = {
    dashboard: 'Dashboard',
    account: 'Data akun',
    institution: 'Data lembaga'
}

const getTitleHeader = (key: string) => titleDashboardHeader[key] || ''

const DashboardHeader = ({ currentMenu }: { currentMenu: string }) => {
    const { signOutAccount } = useAuth()
    const { themeWithTransparent } = useTheme()
    return (
        <View Style={['flexRow']}>
            <View Style={['flexRow', 'roundedXl', 'py3', 'px6', 'expand', 'justifyBetween', 'itemsCenter', { backgroundColor: themeWithTransparent.primaryContainer }]}>
                <View Style={['flexColumn']}>
                    <Text variant="titleLarge" Weight="fontBold" numberOfLines={1}>
                        {getTitleHeader(currentMenu)}
                    </Text>
                </View>
                <View Style={['flexColumn']}>
                    <IconButton icon={'logout'} size={14} onPress={signOutAccount} />
                </View>
            </View>
        </View>
    )
}

const Dashboard = ({ currentMenu }: { currentMenu: string }) => {
    return (
        <View Style={['flexColumn', 'expand', 'p4']}>
            {currentMenu && <DashboardHeader currentMenu={currentMenu} />}
            {currentMenu === 'account' && <AccountPage />}
            {currentMenu === 'institution' && <InstitutionPage />}
        </View>
    )
}

export default Dashboard
