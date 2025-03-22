import { User } from '~/src/types/userType/User'
import useRedux from '../Redux/useRedux'

const useUser = () => {
    // Get state from Redux
    const { dispatch, slicer, userState } = useRedux()
    // function to set User information
    const setUser = (user_uid: Partial<User>) => {
        return dispatch(slicer.setUser({ user_uid: user_uid.user_uid || null })) ? true : false
    }
    // function to unset User Information
    const unsetUser = () => {
        return dispatch(slicer.unsetUser()) ? true : false
    }
    //return user utility
    return { setUser, unsetUser }
}

export default useUser
