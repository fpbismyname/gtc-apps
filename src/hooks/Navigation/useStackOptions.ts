import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'

const useStackOptions = () => {
    const stackHeader: NativeStackNavigationOptions = {
        headerShown: false
    }
    const bottomTabBar: BottomTabNavigationOptions = {
        headerShown: false
    }

    return { stackHeader, bottomTabBar }
}

export default useStackOptions
