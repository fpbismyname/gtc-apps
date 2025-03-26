import useRedux from '~/src/hooks/Redux/useRedux'
import Section from '../../components/Elements/Section'
import Text from '../../components/Elements/Text'
import React, { useEffect, useState } from 'react'
import Button from '~/src/components/Elements/Button'
import { Layouts } from '~/src/types/otherTypes/Layout'
import useAuth from '~/src/hooks/Auth/useAuth'
import useFirebase from '~/src/hooks/Firebase/useFirebase'
import { AuthType } from '~/src/types/databaseType/AuthType'
import useFetch from '~/src/hooks/Fetch/useFetch'

const ProfileLayout: React.FC<Layouts> = ({ children, padding, direction, color = 'light', expand = false, gap }) => {
    return (
        <Section padding={padding} direction={direction} color={color} expand={expand} gap={gap}>
            <>{children}</>
        </Section>
    )
}

const HeaderProfile: React.FC<Partial<AuthType>> = ({ id, username, email, phone_number, role }) => {
    return (
        <Section color="primary" direction="column" customStyle="rounded-xl p-4">
            <Text size="2xl">Hi, {username}</Text>
            <Text>ID User : {id}</Text>
            <Text>Nama Akun : {username}</Text>
            <Text>Email : {email}</Text>
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
    const { userState } = useRedux()
    const { data_user } = useFetch(userState.user_id)
    const { ...data }: AuthType = data_user?.data

    return (
        <ProfileLayout padding="sm" direction="column" color="light" gap="sm" expand>
            <HeaderProfile username={data.username} id={userState.user_id} email={data.email} />
            <ListProfile />
        </ProfileLayout>
    )
}

export default Profile
