import MainLayouts from './pages/main/MainLayouts'
import AuthLayouts from './pages/main/auth/AuthLayouts'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import useRedux from './hooks/Redux/useRedux'

export default () => {
    // React State
    const { userState } = useRedux()
    const { user } = userState

    return (
        <NavigationContainer>
            <SafeAreaView className="flex-1">{user.userToken ? <MainLayouts /> : <AuthLayouts />}</SafeAreaView>
        </NavigationContainer>
    )
}
