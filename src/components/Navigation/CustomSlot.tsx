import { Stack } from 'expo-router'
import { useTheme } from '~/src/constants/useTheme'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'
import Notify from '../elements/Notify'

const CustomSlot = () => {
    const { theme } = useTheme()
    return (
        <>
            <PaperProvider theme={theme}>
                <SafeAreaProvider>
                    <StatusBar style="auto" />
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
                    <Notify />
                </SafeAreaProvider>
            </PaperProvider>
        </>
    )
}

export default CustomSlot
