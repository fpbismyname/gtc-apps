import { createStackNavigator } from '@react-navigation/stack'
import Auth from '../auth/Auth'
import { SafeAreaView } from 'react-native'
import { useStackOptions } from '~/src/hooks/useStackOptions'

export default function AuthNavigation() {
  const Stack = createStackNavigator()
  const {StackOptions} = useStackOptions()
  return (
    <SafeAreaView className="flex-1">
      <Stack.Navigator screenOptions={StackOptions("AuthLayout")}>
        <Stack.Screen name="authPage" component={Auth} />
      </Stack.Navigator>
    </SafeAreaView>
  )
}
