import { Slot, Stack } from 'expo-router'
import { useTheme } from '~/src/constants/useTheme'

const AuthLayout = () => {
    const { theme } = useTheme()
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: theme.background
                }
            }}
        />
    )
}
export default AuthLayout
