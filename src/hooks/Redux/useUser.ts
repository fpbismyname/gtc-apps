import { UserType } from '~/src/types/userType/UserType'
import useRedux from './useRedux'

const useUser = () => {
    // Get state from Redux
    const { dispatch, slicer } = useRedux()
    // function to set User information
    const setUser = ({ user_id }: UserType) => {
        return dispatch(slicer.setUser({ user_id: user_id })) ? true : false
    }
    // function to unset User Information
    const unsetUser = () => {
        return dispatch(slicer.unsetUser()) ? true : false
    }
    //return user utility
    return { setUser, unsetUser }
}

export default useUser
