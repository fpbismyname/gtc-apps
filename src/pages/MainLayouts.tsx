import useStackOptions from '~/src/hooks/Navigation/useStackOptions'
import useAuthentication from '../hooks/Database/Authentication'
import useRedux from '~/src/hooks/Redux/useRedux'
import Navigator from '../hooks/Navigation/Navigator'
import useUser from '~/src/hooks/Redux/useUser'
import { useEffect } from 'react'
import TabLayouts from './home/TabLayouts'

export default () => {
    // Stack & Navigator
    const { Stack } = Navigator()
    const { stackHeader } = useStackOptions()

    // Check user expirations
    const { userState, dispatch, slicer } = useRedux()
    const { checkUserAvailable } = useAuthentication()
    const { user_id } = userState
    const { unsetUser } = useUser()

    // Check User Existed
    useEffect(() => {
        // Set Auth Toggle to default
        dispatch(slicer.resetToggleAuth())
        // check user_id
        if (!user_id) unsetUser()
        const unsubscribe = checkUserAvailable(user_id, (exist) => {
            if (!exist) {
                unsetUser()
            }
        })
        return () => unsubscribe()
    }, [userState.user_id])

    return (
        <Stack.Navigator screenOptions={stackHeader}>
            <Stack.Screen name="TabLayouts" component={TabLayouts} />
        </Stack.Navigator>
    )
}
