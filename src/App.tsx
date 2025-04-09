import MainLayouts from './pages/MainLayouts'
import AuthLayouts from './pages/auth/AuthLayouts'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import useRedux from './hooks/Redux/useRedux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'
import Text from './components/Elements/Text'
import NoInternetConnection from './pages/error/NoInternet'

export default () => {
    // React State, call clearReduxData for cleaning past data
    const { userState, clearReduxData, slicer, dispatch } = useRedux()
    const { user_id } = userState

    // State Internet Connection
    const [isInternetConnected, setIsInternetConnected] = useState<boolean>(true)

    // Debug localstorage
    const localStorage = async () => {
        // Clear all data in local storage
        // const data = await AsyncStorage.clear()
        // Get all keys redux on localstorage
        const data = await AsyncStorage.getItem('persist:gtc-apps')
        console.log(data)
    }
    // dispatch(slicer.unsetNotify())

    // localStorage()

    // Debug User Information
    // console.log(userState)

    // Reset Redux localstorage
    // clearReduxData()

    // Check internet connection
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsInternetConnected(state.isConnected && state.isInternetReachable ? true : false)
        })

        return () => unsubscribe()
    }, [])

    const themeNavigator = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: '#ffffff'
        }
    }

    return (
        <NavigationContainer theme={themeNavigator}>
            {isInternetConnected ? (
                <SafeAreaView className="flex-1">{user_id && isInternetConnected ? <MainLayouts /> : <AuthLayouts />}</SafeAreaView>
            ) : (
                <SafeAreaView className="flex-1">
                    <NoInternetConnection />
                </SafeAreaView>
            )}
        </NavigationContainer>
    )
}
