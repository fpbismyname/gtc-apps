import { Stack } from 'expo-router'
import { useTheme } from '~/src/constants/useTheme'
import Notify from '../elements/Notify'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const CustomSlot = () => {
    const { theme } = useTheme()
    return (
        <>
            <PaperProvider theme={theme}>
                <SafeAreaProvider>
                    <StatusBar style="auto" />
                    <Notify />
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
                </SafeAreaProvider>
            </PaperProvider>
        </>
    )
}

export default CustomSlot
