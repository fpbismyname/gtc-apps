import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'

export default () => {
  const Stack = createNativeStackNavigator()
  const Tabs = createBottomTabNavigator()
  const router = useNavigation<any>()
  return { Stack, Tabs, router}
}
