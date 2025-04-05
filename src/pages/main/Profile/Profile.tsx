import { Layouts } from '~/src/types/otherTypes/Layout'
import { AuthType } from '~/src/types/databaseType/AuthType'
import useRedux from '~/src/hooks/Redux/useRedux'
import Section from '../../../components/Elements/Section'
import Text from '../../../components/Elements/Text'
import Button from '~/src/components/Elements/Button'
import useAuth from '~/src/hooks/Auth/useAuth'
import useFetch from '~/src/hooks/Fetch/useFetch'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FC } from 'react'
import { colorPallet } from '~/src/constants/colorPallete'
import Navigator from '~/src/hooks/Navigation/useNavigator'
import { institutionType, MasterDataType } from '~/src/types/databaseType/MasterDataType'

export const checkRolesUser = (roles: string | null | undefined) => {
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

const ProfileLayout: FC<Layouts> = ({ children, padding, direction, color = 'light', expand = false, gap, customStyle }) => {
    return (
        <Section padding={padding} direction={direction} color={color} expand={expand} gap={gap} customStyle={customStyle}>
            <>{children}</>
        </Section>
    )
}

const HeaderProfile: FC<{ user_id: string | null }> = ({ user_id }) => {
    // Get user information
    const { data_user } = useFetch(user_id)
    // Get signOut Auth Method
    const { authSignOut } = useAuth()
    return (
        <Section color="primary" direction="row" customStyle="rounded-xl p-4 items-center">
            <Section direction="row" gap="sm" expand customStyle="items-center">
                <Icon name="account-circle" size={42} color={colorPallet.dark} />
                <Section direction="column" gap="xs">
                    <Text size="xl">{data_user?.username}</Text>
                    <Text size="xs" color="dark">
                        {checkRolesUser(data_user?.role)}
                    </Text>
                </Section>
            </Section>
            <Section>
                <Button icon="exit-to-app" color="dark" iconSize="xl" iconColor="active" onPress={authSignOut} />
            </Section>
        </Section>
    )
}

const ListProfileInformation: FC<{ user_id: string | null }> = ({ user_id }) => {
    // Fetch Data
    const { data_user, masterData } = useFetch(user_id)

    // Get Navigator
    const { router } = Navigator()

    return (
        <Section direction="column" gap="sm">
            <Text padding="sm" weight="bold">
                Informasi Lembaga
            </Text>
            <Button
                title="Gading Training Center"
                icon="bank"
                color="primary"
                onPress={() =>
                    router.navigate('ProfileMenu', {
                        title: 'Gading Training Center',
                        route: 'institution_information',
                        data: masterData as institutionType
                    })
                }
            />
            <Text padding="sm" weight="bold">
                Informasi Modul
            </Text>
            <Button
                title="Materi terselesaikan"
                icon="book-check"
                color="primary"
                onPress={() =>
                    router.navigate('ProfileMenu', {
                        title: 'Materi Terselesaikan',
                        route: 'done_module',
                        data: data_user
                    })
                }
            />
            <Text padding="sm" weight="bold">
                Informasi Akun
            </Text>
            <Button
                title="Membership"
                icon="account-group"
                color="primary"
                onPress={() =>
                    router.navigate('ProfileMenu', {
                        title: 'Membership',
                        route: 'membership',
                        data: data_user
                    })
                }
            />
            <Button
                title="Akun saya"
                icon="account"
                color="primary"
                onPress={() =>
                    router.navigate('ProfileMenu', {
                        title: 'Akun Saya',
                        route: 'my_account',
                        data: data_user
                    })
                }
            />
        </Section>
    )
}

const Profile = () => {
    // Check User id
    const { userState } = useRedux()

    return (
        <ProfileLayout direction="column" customStyle="px-4 pt-2" color="light" gap="sm" expand>
            <HeaderProfile user_id={userState.user_id} />
            <ListProfileInformation user_id={userState.user_id} />
        </ProfileLayout>
    )
}

export default Profile
