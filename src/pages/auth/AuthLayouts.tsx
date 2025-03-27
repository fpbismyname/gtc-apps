import useStackOptions from '~/src/hooks/Navigation/useStackOptions'
import Navigator from '../../hooks/Navigation/Navigator'
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
