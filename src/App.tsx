import MainLayouts from './pages/MainLayouts'
import AuthLayouts from './pages/auth/AuthLayouts'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import useRedux from './hooks/Redux/useRedux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import constant from 'expo-constants'

export default () => {
    // React State, call clearReduxData for cleaning past data
    const { userState, clearReduxData, slicer, dispatch } = useRedux()
    const { user_id } = userState

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

    return (
        <NavigationContainer>
            <SafeAreaView className="flex-1">{user_id ? <MainLayouts /> : <AuthLayouts />}</SafeAreaView>
        </NavigationContainer>
    )
}
