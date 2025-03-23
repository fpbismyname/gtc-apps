import useStackOptions from '~/src/hooks/Others/useStackOptions'
import Navigator from '../../hooks/Others/Navigator'
import AuthPage from './AuthPage'

export default () => {
    const { Stack } = Navigator()
    const { stackHeader } = useStackOptions()
    return (
        <Stack.Navigator initialRouteName="auth" screenOptions={stackHeader}>
            <Stack.Screen name="auth" component={AuthPage} />
        </Stack.Navigator>
    )
}
