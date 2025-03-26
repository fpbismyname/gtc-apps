import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { StackParamList, TabsParamList } from '~/src/types/navigatorType/Navigator'

const Navigator = () => {
    const Stack = createNativeStackNavigator<StackParamList>()
    const Tabs = createBottomTabNavigator<TabsParamList>()
    const router = useNavigation<any>()
    return { Stack, Tabs, router }
}

export default Navigator
