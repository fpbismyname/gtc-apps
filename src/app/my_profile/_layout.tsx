import { Stack } from 'expo-router'
import CustomHeader from '~/src/components/navigation/CustomHeader'
import { useTheme } from '~/src/constants/useTheme'

const ProfilesLayout = () => {
    const { theme } = useTheme()
    return (
        <Stack
            screenOptions={{
                header: (props) => <CustomHeader {...props} />,
                headerShown: true,
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
            <Stack.Screen name="[id]" />
        </Stack>
    )
}

export default ProfilesLayout
