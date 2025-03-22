import useRedux from '~/src/hooks/Redux/useRedux'
import Section from '../../components/Elements/Section'
import Text from '../../components/Elements/Text'
import React from 'react'
import Button from '~/src/components/Elements/Button'
import { Layouts } from '~/src/types/Layout'
import useAuth from '~/src/hooks/Auth/useAuth'

const ProfileLayout: React.FC<Layouts> = ({ children, padding, direction, color = 'light', expand = false, gap }) => {
    return (
        <Section padding={padding} direction={direction} color={color} expand={expand} gap={gap}>
            <>{children}</>
        </Section>
    )
}

const HeaderProfile: React.FC = () => {
    const { userState } = useRedux()
    return (
        <Section color="primary" direction="column" customStyle="rounded-xl p-4">
            <Text>Hi, {userState.user_uid}</Text>
            {/* <Text>Nama Akun : {dataUser?.email}</Text> */}
            {/* <Text>ID User : {dataUser?.sub}</Text> */}
        </Section>
    )
}

const ListProfile: React.FC = () => {
    const { authSignOut } = useAuth()
    return (
        <Section direction="column" gap="sm" padding="md">
            <Button title="Logout" onPress={authSignOut} />
        </Section>
    )
}

const Profile = () => {
    return (
        <ProfileLayout padding="sm" direction="column" color="light" gap="sm" expand>
            <HeaderProfile />
            <ListProfile />
        </ProfileLayout>
    )
}

export default Profile
