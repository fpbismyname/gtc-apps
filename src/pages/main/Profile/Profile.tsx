import { Layouts } from '~/src/types/otherTypes/Layout'
import useRedux from '~/src/hooks/Redux/useRedux'
import Section from '../../../components/Elements/Section'
import Text from '../../../components/Elements/Text'
import Button from '~/src/components/Elements/Button'
import useAuth from '~/src/hooks/Auth/useAuth'
import { FC, useCallback, useEffect, useState } from 'react'
import Navigator from '~/src/hooks/Navigation/useNavigator'
import Image from '~/src/components/Elements/Image'
import useAuthentication from '~/src/hooks/Database/Authentication'
import { useFocusEffect } from '@react-navigation/native'
import { AuthType } from '~/src/types/databaseType/AuthType'
import { institutionType } from '~/src/types/databaseType/MasterDataType'
import useMasterData from '~/src/hooks/Database/MasterData'

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
            role_user = '---'
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

const HeaderProfile: FC<{ user_data: Partial<AuthType> | null; signOut: () => void }> = ({ user_data, signOut }) => {
    const headerInformation = {
        username: user_data?.username || '---',
        profile_picture: user_data?.picture || '',
        role: () => checkRolesUser(user_data?.role || '')
    }

    return (
        <Section color="primary" direction="row" customStyle="rounded-xl p-4 items-center">
            <Section direction="row" gap="sm" expand customStyle="items-center">
                <Image imageUri={headerInformation.profile_picture} size="sm" />
                <Section direction="column" gap="xs">
                    <Text size="xl">{headerInformation.username}</Text>
                    <Text size="xs" color="dark">
                        {headerInformation.role()}
                    </Text>
                </Section>
            </Section>
            <Section>
                <Button icon="exit-to-app" color="dark" iconSize="xl" iconColor="active" onPress={signOut} />
            </Section>
        </Section>
    )
}

const ListProfileInformation: FC<{ user_data: Partial<AuthType> | null; institution_data: Partial<institutionType> | null }> = ({ user_data, institution_data }) => {
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
                        data: institution_data
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
                        route: 'membership_information',
                        data: user_data
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
                        route: 'account_information',
                        data: user_data
                    })
                }
            />
        </Section>
    )
}

const Profile = () => {
    // Check User id
    const { userState } = useRedux()
    const userId = userState.user_id || ''

    // HeaderProfile fetched data
    const { getAuthData } = useAuthentication()
    const [userData, setUserData] = useState<Partial<AuthType> | null>(null)
    const { authSignOut } = useAuth()

    // ListProfileInformation
    const { getMasterData } = useMasterData()
    const [institutionData, setInstitutionData] = useState<Partial<institutionType> | null>(null)

    // Fetching data
    useFocusEffect(
        useCallback(() => {
            // Get user data
            const unsubscribeAuthData = getAuthData(userId, (data) => {
                if (data) setUserData({ ...data, id: userId })
            })
            const unsubscribeInstitutionData = getMasterData('institution_information', (data) => {
                if (data) setInstitutionData({ ...data })
            })

            // Get Institution Data
            return () => {
                unsubscribeAuthData()
                unsubscribeInstitutionData()
            }
        }, [])
    )

    return (
        <ProfileLayout direction="column" customStyle="px-4 pt-2" color="light" gap="sm" expand>
            <HeaderProfile user_data={userData} signOut={authSignOut} />
            <ListProfileInformation user_data={userData} institution_data={institutionData} />
        </ProfileLayout>
    )
}

export default Profile
