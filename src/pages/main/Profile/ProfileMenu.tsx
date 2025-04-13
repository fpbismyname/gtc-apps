import { AuthType } from '~/src/types/databaseType/AuthType'
import { StackParamList, TabMenuPage } from '~/src/types/navigatorType/Navigator'
import { RouteProp, useRoute } from '@react-navigation/native'
import Image from '~/src/components/Elements/Image'
import Section from '~/src/components/Elements/Section'
import Text from '~/src/components/Elements/Text'
import { checkRolesUser } from './Profile'
import { institutionType } from '~/src/types/databaseType/MasterDataType'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import Link from '~/src/components/Elements/Link'
import { FC } from 'react'

const MyAccount: FC<{ user: Partial<AuthType> }> = ({ user }) => {
    const AccountInformation: Partial<AuthType> = { ...user }
    return (
        <>
            <Section direction="row">
                <Section direction="column" padding="xl" customStyle="items-center" gap="sm">
                    <Image size="md" imageUri={AccountInformation.picture} />
                    <Text size="xl">{AccountInformation.username}</Text>
                </Section>
            </Section>
            <Section direction="row">
                <Section direction="column" gap="md" padding="xl" customStyle="rounded-xl" color="primary">
                    <Section direction="row" customStyle="items-center" gap="sm">
                        <Icon name="account" size={24} />
                        <Text size="xl">{AccountInformation.username}</Text>
                    </Section>
                    <Section direction="row" customStyle="items-center" gap="sm">
                        <Icon name="email" size={24} />
                        <Text size="xl">{AccountInformation.email}</Text>
                    </Section>
                    <Section direction="row" customStyle="items-center" gap="sm">
                        <Icon name="access-point-network" size={20} />
                        <Text size="xl">{AccountInformation.phone_number}</Text>
                    </Section>
                    <Section direction="row" customStyle="items-center" gap="sm">
                        <Icon name="abjad-hebrew" size={20} />
                        <Text size="xl">{checkRolesUser(AccountInformation.role)}</Text>
                    </Section>
                    <Section direction="row" customStyle="items-center" gap="sm">
                        <Icon name={user.isActive ? 'abacus' : 'account-off'} size={24} />
                        <Text size="xl">{AccountInformation.isActive ? 'Aktif' : 'Nonaktif'}</Text>
                    </Section>
                </Section>
            </Section>
        </>
    )
}

const InstitutionInfo: FC<{ data: institutionType }> = ({ data }) => {
    const institution = data as institutionType
    return (
        <>
            <Section direction="row">
                <Section direction="column" gap="xl" customStyle="items-center" padding="xl">
                    <Image imageUri={institution?.logo} size="md" />
                </Section>
            </Section>
            <Section direction="row">
                <Section direction="column" gap="md" padding="xl" customStyle="rounded-xl" color="primary">
                    <Section direction="row" customStyle="items-center" gap="sm">
                        <Icon name="bank" size={24} />
                        <Text size="xl">{institution?.name}</Text>
                    </Section>
                    <Section direction="row" customStyle="items-center flex-wrap" gap="sm">
                        <Icon name="map-marker" size={10} />
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

const MembershipInfo: FC<{ data: AuthType }> = ({ data }) => {
    const { ...user } = data as AuthType
    return (
        <Section>
            <Section>
                <Text>{checkRolesUser(user.role)}</Text>
            </Section>
        </Section>
    )
}

const ProfileMenu = () => {
    const { params } = useRoute<RouteProp<StackParamList>>()
    const { data, route }: TabMenuPage = params as TabMenuPage

    return (
        <Section direction="column" gap="xl" padding="md" customStyle="items-center justify-center" expand>
            {route === 'account_information' && <MyAccount user={data as AuthType} />}
            {route === 'institution_information' && <InstitutionInfo data={data as institutionType} />}
            {route === 'membership_information' && <MembershipInfo data={data as AuthType} />}
        </Section>
    )
}

export default ProfileMenu
