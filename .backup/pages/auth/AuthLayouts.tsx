import useStackOptions from '~/src/hooks/Navigation/useStackOptions'
import Navigator from '../../../src/hooks/Navigation/useNavigator'
import AuthForm from './AuthForm'

export default () => {
    const { Stack } = Navigator()
    const { stackHeader } = useStackOptions()
    return (
        <Stack.Navigator initialRouteName="Auth" screenOptions={stackHeader(false)}>
            <Stack.Screen name="Auth" component={AuthForm} />
        </Stack.Navigator>
    )
}
