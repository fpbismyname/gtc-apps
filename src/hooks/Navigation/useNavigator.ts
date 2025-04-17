import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'

const useNavigator = () => {
    const Stack = createNativeStackNavigator()
    const Tabs = createBottomTabNavigator()
    const router = useNavigation()
    return { Stack, Tabs, router }
}

export default useNavigator
