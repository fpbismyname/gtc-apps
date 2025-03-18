import { BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'

export default () => {
    const stackHeader: NativeStackNavigationOptions = {
        headerShown: false
    }
    const bottomTabBar: BottomTabNavigationOptions = {
        headerShown: false
    }

    return { stackHeader, bottomTabBar }
}
