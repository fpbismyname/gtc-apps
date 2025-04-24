import { FC } from 'react'
import { Icon } from 'react-native-paper'
import Button from '~/src/components/elements/Button'
import Text from '~/src/components/elements/Text'
import View from '~/src/components/elements/View'
import { IconNameType } from '~/src/constants/useTheme'
import useAuth from '~/src/hooks/Auth/useAuth'

const WelcomeAdmin: FC<{ InstitutionName: string }> = ({ InstitutionName }) => {
    const { signOutAccount } = useAuth()
    return (
        <View Style={['flexColumn', 'itemsCenter', 'justifyCenter', 'expand', 'gap8']}>
            <View Style={['itemsCenter', 'opacity30', 'gap4']}>
                <Icon source={'shield-account' as IconNameType} size={128} />
                <View Style={['itemsCenter']}>
                    <Text variant="headlineSmall">{InstitutionName}</Text>
                    <Text variant="headlineSmall">Selamat datang di halaman admin</Text>
                </View>
            </View>
            <View>
                <Button icon={'logout'} onPress={signOutAccount}>
                    Logout
                </Button>
            </View>
        </View>
    )
}

export default WelcomeAdmin
