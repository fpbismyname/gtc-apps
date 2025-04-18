import { Stack } from 'expo-router'
import { useTheme } from '~/src/constants/useTheme'

const AuthLayout = () => {
    const { theme } = useTheme()
    return (
        <Stack
            screenOptions={{
                headerShown: false,
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
        />
    )
}
export default AuthLayout
