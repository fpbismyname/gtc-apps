import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { StackParamList, TabsParamList } from '~/src/types/navigatorType/Navigator'

const useNavigator = () => {
    const Stack = createNativeStackNavigator<StackParamList>()
    const Tabs = createBottomTabNavigator<TabsParamList>()
    const router = useNavigation<NavigationProp<StackParamList & TabsParamList>>()
    return { Stack, Tabs, router }
}

export default useNavigator
