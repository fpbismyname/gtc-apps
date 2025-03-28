import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import CustomHeader from '~/src/components/Navigation/CustomHeader'

const useStackOptions = () => {
    const stackHeader = (headerShown: boolean, screenName?: string): NativeStackNavigationOptions => ({
        animation: 'fade_from_bottom',
        title: screenName,
        headerShown: headerShown,
        header: (props) => <CustomHeader {...props} />
    })
    const bottomTabBar: BottomTabNavigationOptions = {
        animation: 'fade',
        headerShown: false
    }

    return { stackHeader, bottomTabBar }
}

export default useStackOptions
