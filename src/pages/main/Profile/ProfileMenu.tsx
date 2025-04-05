import { AuthType } from '~/src/types/databaseType/AuthType'
import { StackParamList, TabMenuPage } from '~/src/types/navigatorType/Navigator'
import { RouteProp, useRoute } from '@react-navigation/native'
import Image from '~/src/components/Elements/Image'
import Section from '~/src/components/Elements/Section'
import Text from '~/src/components/Elements/Text'
import { checkRolesUser } from './Profile'
import Button from '~/src/components/Elements/Button'
import { institutionType, MasterDataType } from '~/src/types/databaseType/MasterDataType'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Link from '~/src/components/Elements/Link'

const ProfileMenu = () => {
    const { params } = useRoute<RouteProp<StackParamList>>()
    const { data, route }: TabMenuPage = params as TabMenuPage

    const MyAccount = () => {
        const { ...user }: AuthType = data as AuthType
        return (
            <>
                <Section direction="row">
                    <Section direction="column" customStyle="items-center" gap="sm">
                        <Image size="md" imageUri="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" />
                        <Text size="xl">{user.username}</Text>
                    </Section>
                </Section>
                <Section direction="row">
                    <Section direction="column" gap="md" padding="xl" customStyle="items-start rounded-xl" color="primary">
                        <Section direction="row" customStyle="items-center" gap="sm">
                            <Icon name="account" size={24} />
                            <Text size="xl">{user.username}</Text>
                        </Section>
                        <Section direction="row" customStyle="items-center" gap="sm">
                            <Icon name="email" size={24} />
                            <Text size="xl">{user.email}</Text>
                        </Section>
                        <Section direction="row" customStyle="items-center" gap="sm">
                            <Icon name="whatsapp" size={24} />
                            <Text size="xl">{user.phone_number}</Text>
                        </Section>
                        <Section direction="row" customStyle="items-center" gap="sm">
                            <Icon name="account-group" size={24} />
                            <Text size="xl">{checkRolesUser(user.role)}</Text>
                        </Section>
                        <Section direction="row" customStyle="items-center" gap="sm">
                            <Icon name={user.isActive ? 'account-check' : 'account-off'} size={24} />
                            <Text size="xl">{user.isActive ? 'Aktif' : 'Nonaktif'}</Text>
                        </Section>
                    </Section>
                </Section>
                <Section direction="row" gap="sm">
                    <Button title="Edit akun" size="md" color="primary" icon="account-edit" />
                </Section>
            </>
        )
    }

    const InstitutionInfo = () => {
        const institution = data as institutionType
        return (
            <>
                <Section direction="row">
                    <Section direction="column" gap="xl">
                        <Image imageUri={institution?.logo} size="md" />
                    </Section>
                </Section>
                <Section direction="row" padding="xl">
                    <Section direction="column" gap="md" padding="xl" customStyle="items-start rounded-xl" color="primary">
                        <Section direction="row" customStyle="items-center" gap="sm">
                            <Icon name="bank" size={24} />
                            <Text size="xl">{institution?.name}</Text>
                        </Section>
                        <Section direction="row" customStyle="items-center" gap="sm">
                            <Icon name="map-marker" size={24} />
                            <Link size="md" title={institution?.address} />
                        </Section>
                        <Section direction="row" customStyle="items-center" gap="sm">
                            <Icon name="email" size={24} />
                            <Text size="xl">{institution?.email}</Text>
                        </Section>
                        <Section direction="row" customStyle="items-center" gap="sm">
                            <Icon name="phone" size={24} />
                            <Text size="xl">{institution?.phone_number}</Text>
                        </Section>
                        <Section direction="row" customStyle="items-center" gap="sm">
                            <Icon name="web" size={24} />
                            <Link size="xl" title={institution?.website} />
                        </Section>
                    </Section>
                </Section>
            </>
        )
    }

    return (
        <Section direction="column" gap="xl" customStyle="items-center justify-center" expand>
            {route === 'my_account' && <MyAccount />}
            {route === 'institution_information' && <InstitutionInfo />}
        </Section>
    )
}

export default ProfileMenu
