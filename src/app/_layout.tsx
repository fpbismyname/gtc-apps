import { Slot, Stack } from 'expo-router'
import { PaperProvider } from 'react-native-paper'
import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from '../constants/useTheme'
import { useFonts } from 'expo-font'
import * as Splash from 'expo-splash-screen'
import LoadingScreen from '../components/elements/LoadingScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const RootLayout = () => {
    // load custom font
    const [fontsLoaded] = useFonts({
        'Open-Sans': require('~/src/assets/fonts/Open-Sans.ttf')
    })

    // check font loaded
    useEffect(() => {
        Splash.preventAutoHideAsync()
        if (fontsLoaded) Splash.hideAsync()
    }, [fontsLoaded])

    // Get Theme Navigator
    const { theme } = useTheme()

    return (
        <>
            {!fontsLoaded ? <LoadingScreen children /> : null}
            <PaperProvider theme={theme}>
                <SafeAreaProvider>
                    <StatusBar style="auto" />
                    <Slot />
                </SafeAreaProvider>
            </PaperProvider>
        </>
    )
}
export default RootLayout
