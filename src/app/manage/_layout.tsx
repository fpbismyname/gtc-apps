import { router, Stack } from 'expo-router'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import CustomHeader from '~/src/components/navigation/CustomHeader'
import { useTheme } from '~/src/constants/useTheme'
import useCollectionRealTime from '~/src/hooks/Firebase/useCollectionRealTime'
import { useUsers } from '~/src/store/useUsers'
import { Account } from '~/src/types/Firebase/Account'

const AdminLayout = () => {
    // Users ID
    const { states: users, deleteUserID } = useUsers()
    // Notify

    // Check user availablility data
    const { datas } = useCollectionRealTime({ collectionPath: `Account`, queryByDocId: users.user_id || '' })

    // Users
    const Users = datas as Account

    // Check Platform
    const onPlatform = Platform.OS

    // clean up users when account is deleted
    useEffect(() => {
        const checkUser = setTimeout(() => {
            if (!Users?.id && users.user_id) {
                deleteUserID()
            }
            if (Users.information.role !== 'admin') {
                if (onPlatform === 'web') {
                    router.replace('/(tabs)/')
                } else {
                    router.replace('/manage')
                }
            }
        }, 500)
        return () => clearTimeout(checkUser)
    }, [datas])

    const { theme } = useTheme()
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: (props) => <CustomHeader {...props} />,
                headerTintColor: theme.onBackground,
                headerStyle: {
                    backgroundColor: theme.background
                },
                headerTitleStyle: {
                    color: theme.onBackground
                },
                headerShadowVisible: false,
                contentStyle: {
                    backgroundColor: theme.background
                },
                animation: 'fade_from_bottom'
            }}
        >
            <Stack.Screen name="index" options={{ title: 'Manage' }} />
        </Stack>
    )
}

export default AdminLayout
