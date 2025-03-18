import useStackOptions from '~/src/hooks/StackOptions/useStackOptions'
import Navigator from '../components/Navigator'
import TabLayouts from './home/TabLayouts'

export default () => {
    const { Stack } = Navigator()
    const { stackHeader } = useStackOptions()
    return (
        <Stack.Navigator screenOptions={stackHeader}>
            <Stack.Screen name="TabsLayout" component={TabLayouts} />
        </Stack.Navigator>
    )
}
