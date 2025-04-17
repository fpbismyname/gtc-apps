import { router, Slot, useSegments } from 'expo-router'
import { PaperProvider } from 'react-native-paper'
import { useUsers } from '../store/useUsers'
import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from '../constants/useTheme'
import { useFonts } from 'expo-font'
import * as Splash from 'expo-splash-screen'
import LoadingScreen from '../components/elements/LoadingScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const RootLayout = () => {
    // Get User Id
    const { states } = useUsers()

    // Get Segments route
    const segments = useSegments()

    // load custom font
    const [fontsLoaded] = useFonts({
        'Open-Sans': require('~/src/assets/fonts/Open-Sans.ttf')
    })

    // check font loaded
    useEffect(() => {
        Splash.preventAutoHideAsync()
        if (fontsLoaded) Splash.hideAsync()
    }, [fontsLoaded])

    // Check routing
    useEffect(() => {
        const inAuthGroup = segments[0] === '(auth)'

        if (!states.user_id && !inAuthGroup) {
            router.replace('/auth')
        }

        if (states.user_id && inAuthGroup) {
            router.replace('/home')
        }
    }, [segments, states.user_id])

    // Get Theme Navigator
    const { theme } = useTheme()

    // none

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
