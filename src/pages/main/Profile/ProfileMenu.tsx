import { colorPallet } from '~/src/constants/colorPallete'
import { AuthType } from '~/src/types/databaseType/AuthType'
import { routeTabMenu, StackParamList, TabMenuPage } from '~/src/types/navigatorType/Navigator'
import { RouteProp, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Image from '~/src/components/Elements/Image'
import Section from '~/src/components/Elements/Section'
import Text from '~/src/components/Elements/Text'
import TextInput from '~/src/components/Elements/TextInput'
import { checkRolesUser } from './Profile'
import Button from '~/src/components/Elements/Button'

const ProfileMenu = () => {
    const { params } = useRoute<RouteProp<StackParamList>>()
    const { data, route, title }: TabMenuPage = params as TabMenuPage
    const { ...user }: AuthType = data as AuthType

    const MyAccount = () => {
        return (
            <>
                <Section direction="row" customStyle="justify-center">
                    <Section direction="column" customStyle="items-center" gap="sm">
                        <Image size="md" imageUri="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" />
                        <Text size="xl">{user.username}</Text>
                    </Section>
                </Section>
                <Section direction="row">
                    <Section direction="column" customStyle="gap-4" expand>
                        <TextInput size="sm" label="Username" labelIcon="account" value={user.username} disable />
                        <TextInput size="sm" label="Email" labelIcon="email" value={user.email} disable />
                        <TextInput size="sm" label="No. Telepon" labelIcon="phone" value={user.phone_number} disable />
                        <TextInput size="sm" label="Pengguna" labelIcon="account-circle" value={checkRolesUser(user.role)} disable />
                        <TextInput size="sm" label="Status" labelIcon={user.isActive ? 'account-check' : 'account-off'} value={user.isActive ? 'Aktif' : 'Nonaktif'} disable />
                    </Section>
                </Section>
                <Section direction="row" gap="sm">
                    <Button title="Edit akun" size="sm" color="primary" icon="account-edit" />
                    <Button title="Hapus akun" size="sm" color="danger" icon="account-remove" />
                </Section>
            </>
        )
    }

    return (
        <Section direction="column" padding="md" gap="xl" customStyle="items-center justify-center" expand>
            {route === 'my_account' && <MyAccount />}
        </Section>
    )
}

export default ProfileMenu
