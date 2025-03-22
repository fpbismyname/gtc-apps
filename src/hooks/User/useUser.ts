import { UserInformation } from '~/src/types/User/User'
import useRedux from '../Redux/useRedux'

const useUser = () => {
    // Get state from Redux
    const { dispatch, slicer, userState } = useRedux()
    // function to set User information
    const setUser = (newUser: Partial<UserInformation>) => {
        const mergedUser = {
            ...userState,
            ...newUser
        }
        return dispatch(slicer.setUser(mergedUser)) ? true : false
    }
    // function to unset User Information
    const unsetUser = () => {
        return dispatch(slicer.unsetUser()) ? true : false
    }
    //return user utility
    return { setUser, unsetUser }
}

export default useUser
