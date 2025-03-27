import { Layouts } from '~/src/types/otherTypes/Layout'
import { AuthType } from '~/src/types/databaseType/AuthType'
import useRedux from '~/src/hooks/Redux/useRedux'
import Section from '../../components/Elements/Section'
import Text from '../../components/Elements/Text'
import Button from '~/src/components/Elements/Button'
import useAuth from '~/src/hooks/Auth/useAuth'
import useFetch from '~/src/hooks/Fetch/useFetch'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FC, useCallback, useState } from 'react'
import { colorPallet } from '~/src/constants/colorPallete'

const checkRolesUser = (roles: string | null | undefined) => {
    let role_user
    switch (roles) {
        case 'admin':
            role_user = 'Admin'
            break
        case 'new_user':
            role_user = 'Pengguna baru'
            break
        case 'student':
            role_user = 'Pelajar'
            break
        case 'teacher':
            role_user = 'Sensei'
            break
        default:
            role_user = 'None'
    }
    return role_user
}

const ProfileLayout: FC<Layouts> = ({ children, padding, direction, color = 'light', expand = false, gap }) => {
    return (
        <Section padding={padding} direction={direction} color={color} expand={expand} gap={gap}>
            <>{children}</>
        </Section>
    )
}

const HeaderProfile: FC<Partial<AuthType> & { logoutMethod: () => void }> = ({ id, username, email, phone_number, role, logoutMethod }) => {
    return (
        <Section color="primary" direction="row" customStyle="rounded-xl p-4 items-center">
            <Section direction="row" gap="sm" expand customStyle="items-center">
                <Icon name="account-circle" size={42} color={colorPallet.gray} />
                <Section direction="column" gap="xs">
                    <Text size="xl">{username}</Text>
                    <Text size="xs" color="gray">
                        {checkRolesUser(role)}
                    </Text>
                </Section>
            </Section>
            <Section>
                <Button icon="exit-to-app" iconSize="3xl" iconColor={colorPallet.danger} onPress={logoutMethod} color="transparent" />
            </Section>
        </Section>
    )
}

const ListProfileInformation: FC = () => {
    return (
        <Section direction="column" padding="sm" gap="sm">
            <Text padding="sm" weight="bold">
                Informasi Lembaga
            </Text>
            <Button title="Gading Training Center" icon="bank" color="primary" />
            <Text padding="sm" weight="bold">
                Informasi Modul
            </Text>
            <Button title="Materi terselesaikan" icon="book-check" color="primary" />
            <Text padding="sm" weight="bold">
                Informasi Akun
            </Text>
            <Button title="Membership" icon="account-group" color="primary" />
            <Button title="Akun saya" icon="account" color="primary" />
        </Section>
    )
}

const Profile = () => {
    // Check User
    const { userState } = useRedux()
    const { data_user } = useFetch(userState.user_id)
    // Modal user
    const { authSignOut } = useAuth()

    return (
        <ProfileLayout direction="column" padding="sm" color="light" gap="sm" expand>
            <HeaderProfile {...data_user} id={userState.user_id} logoutMethod={authSignOut} />
            <ListProfileInformation />
        </ProfileLayout>
    )
}

export default Profile
