import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Tabs } from 'expo-router'
import { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'
import CustomTabBar from '~/src/components/navigation/CustomTabBar'
import { textMessages } from '~/src/constants/textMessages'
import { useTheme } from '~/src/constants/useTheme'
import useCollectionRealTime from '~/src/hooks/Firebase/useCollectionRealTime'
import { useNotify } from '~/src/store/useNotify'
import { useUsers } from '~/src/store/useUsers'
import { Account } from '~/src/types/Firebase/Account'

const TabLayout = () => {
    // Users ID
    const { states: users, deleteUserID } = useUsers()
    // Notify
    const { setNotifyValue } = useNotify()

    // Check user availablility data
    const { datas } = useCollectionRealTime(`Account`, { queryByDocId: users.user_id || '' })

    // Users
    const Users = datas as Account

    // clean up users when account is deleted
    useEffect(() => {
        const checkUser = setTimeout(() => {
            if (!Users?.id && users.user_id) {
                deleteUserID()
                setNotifyValue({ message: textMessages.deletedAccount })
            }
        }, 3000)
        return () => clearTimeout(checkUser)
    }, [datas])

    // Theme
    const { theme } = useTheme()
    return (
        <Tabs
            tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                sceneStyle: {
                    backgroundColor: theme.background,
                    elevation: 0
                },
                animation: 'shift'
            }}
            initialRouteName="index"
        >
            <Tabs.Screen name="index" options={{ title: 'Beranda' }} />
            <Tabs.Screen name="module" options={{ title: 'Modul' }} />
            <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
        </Tabs>
    )
}
export default TabLayout
