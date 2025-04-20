import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import * as Splash from 'expo-splash-screen'
import CustomSlot from '../components/navigation/CustomSlot'
import { router } from 'expo-router'

const RootLayout = () => {
    // load custom font
    const [fontsLoaded] = useFonts({
        'Open-Sans': require('~/src/assets/fonts/Open-Sans.ttf')
    })

    // check font loaded
    useEffect(() => {
        Splash.preventAutoHideAsync()
        if (fontsLoaded) Splash.hideAsync()
        // router.push('my_profile/ysGdTNkMXTllCM074i3t')
        router.push('/(tabs)/')
    }, [fontsLoaded])

    return (
        <>
            <CustomSlot />
        </>
    )
}
export default RootLayout
