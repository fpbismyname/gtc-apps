import { router, Stack } from 'expo-router'
import { useTheme } from '~/src/constants/useTheme'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import Notify from '../elements/Notify'
import { useEffect, useState } from 'react'
import * as Splash from 'expo-splash-screen'
import LoadingScreen from '../elements/LoadingScreen'
import { useSystemTheme } from '~/src/store/useSystemTheme'

const CustomSlot = ({ route }: { route?: string }) => {
    // States Apps is ready
    const [isReady, setIsReady] = useState<boolean>(false)
    // load custom font
    const [fontsLoaded] = useFonts({
        'Open-Sans': require('~/src/assets/fonts/Open-Sans.ttf')
    })
    // checkFont
    useEffect(() => {
        Splash.preventAutoHideAsync()
        setIsReady(fontsLoaded)
        const loading = async () => {
            await new Promise(() =>
                setTimeout(() => {
                    if (!route) return
                    router.replace(route)
                }, 500)
            )
        }
        if (fontsLoaded) {
            Splash.hideAsync()
            loading()
        }
    }, [fontsLoaded])
    const { theme } = useTheme()
    const { isDarkMode } = useSystemTheme()
    return (
        <>
            <PaperProvider theme={theme}>
                <SafeAreaProvider>
                    <StatusBar style={!isDarkMode ? 'dark' : 'light'} />
                    {isReady ? (
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
                    ) : (
                        <LoadingScreen children />
                    )}
                    <Notify />
                </SafeAreaProvider>
            </PaperProvider>
        </>
    )
}

export default CustomSlot
