import useStackOptions from '~/src/hooks/Navigation/useStackOptions'
import Navigator from '../../hooks/Navigation/useNavigator'
import AuthPage from './AuthPage'

export default () => {
    const { Stack } = Navigator()
    const { stackHeader } = useStackOptions()
    return (
        <Stack.Navigator initialRouteName="Auth" screenOptions={stackHeader}>
            <Stack.Screen name="Auth" component={AuthPage} />
        </Stack.Navigator>
    )
}
