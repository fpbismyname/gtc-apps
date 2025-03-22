import useStackOptions from '~/src/hooks/StackOptions/useStackOptions'
import Navigator from '../hooks/Navigator'
import TabLayouts from './home/TabLayouts'
import useUser from '~/src/hooks/User/useUser'
import useAccount from '~/src/hooks/Database/Account/useAccount'
import useRedux from '~/src/hooks/Redux/useRedux'
import { useEffect } from 'react'

export default () => {
    // Stack & Navigator
    const { Stack } = Navigator()
    const { stackHeader } = useStackOptions()

    // Check user expirations
    const { checkAccount } = useAccount()
    const { userState, slicer, dispatch } = useRedux()
    const { unsetUser } = useUser()

    // Check User Existed
    useEffect(() => {
        const unsubscribeAccount = checkAccount(userState, (exist) => {
            if (!exist) {
                unsetUser()
            }
        })
        return () => {
            unsubscribeAccount()
            dispatch(slicer.resetToggleAuth())
        }
    }, [])

    return (
        <Stack.Navigator screenOptions={stackHeader}>
            <Stack.Screen name="TabsLayout" component={TabLayouts} />
        </Stack.Navigator>
    )
}
