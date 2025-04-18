import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Tabs } from 'expo-router'
import CustomTabBar from '~/src/components/navigation/CustomTabBar'
import { useTheme } from '~/src/constants/useTheme'

const TabLayout = () => {
    const { theme } = useTheme()
    return (
        <Tabs
            tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                sceneStyle: {
                    backgroundColor: theme.background
                }
            }}
            initialRouteName="home"
        >
            <Tabs.Screen name="home" options={{ title: 'Beranda' }} />
            <Tabs.Screen name="module" options={{ title: 'Modul' }} />
            <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
        </Tabs>
    )
}
export default TabLayout
