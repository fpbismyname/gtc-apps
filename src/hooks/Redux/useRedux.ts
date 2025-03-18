import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../utils/redux/store'
import { setUser, unsetUser } from '../../utils/redux/slices/userInformation'
import { setNotify, unsetNotify } from '../../utils/redux/slices/notifyMessage'
import { handleToggleAuth } from '../../utils/redux/slices/authToggle'

const useRedux = () => {
    // Get Redux state data
    const authState = useSelector((state: RootState) => state.authToggleMethod)
    const notifyState = useSelector((state: RootState) => state.notifyMessage)
    const userState = useSelector((state: RootState) => state.userInformation)
    // For execute Redux function
    const dispatch = useDispatch<AppDispatch>()
    // Redux Slicer
    const slicer = {
        setUser,
        unsetUser,
        setNotify,
        unsetNotify,
        handleToggleAuth
    }

    return { authState, notifyState, userState, slicer, dispatch }
}

export default useRedux
