import MainLayouts from '../src/pages/MainLayouts'
import AuthLayouts from '../src/pages/auth/AuthLayouts'
import NetInfo from '@react-native-community/netinfo'
import NoInternetConnection from '../src/pages/other/NoInternet'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { FC, useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import * as Splash from 'expo-splash-screen'
import Loading from '../src/pages/other/Loading'
import { useTheme } from '../src/constants/useTheme'

Splash.preventAutoHideAsync()

const App: FC = () => {
    // State userID
    const [userId, setUserId] = useState<string | null>(null)

    

    return (
        <NavigationContainer theme={themeNavigator || {}}>
            {isInternetConnected ? (
                <SafeAreaView style={{ flex: 1 }}>{userId && isInternetConnected ? <MainLayouts /> : <AuthLayouts />}</SafeAreaView>
            ) : (
                <SafeAreaView style={{ flex: 1 }}>
                    <NoInternetConnection />
                </SafeAreaView>
            )}
        </NavigationContainer>
    )
}

export default App
