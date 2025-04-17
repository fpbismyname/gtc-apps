import useStackOptions from '~/src/hooks/Navigation/useStackOptions'
import useNavigator from '../../src/hooks/Navigation/useNavigator'
import { useEffect } from 'react'
import TabLayouts from './main/TabLayouts'
import ProfileItem from './main/Profile/ProfileItem'

export default () => {
    // Stack & Navigator
    const { Stack } = useNavigator()
    const { stackHeader } = useStackOptions()

    return (
        <Stack.Navigator screenOptions={stackHeader(false)}>
            <Stack.Screen name="TabLayouts" component={TabLayouts} />
            <Stack.Screen name="ProfileItem" component={ProfileItem} options={stackHeader(true)} />
        </Stack.Navigator>
    )
}
