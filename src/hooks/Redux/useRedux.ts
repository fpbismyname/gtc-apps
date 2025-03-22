import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, persistor, RootState } from '../../utils/redux/store'
import { setUser, unsetUser } from '../../utils/redux/slices/userInformation'
import { setNotify, unsetNotify } from '../../utils/redux/slices/notifyMessage'
import { handleToggleAuth, resetToggleAuth } from '../../utils/redux/slices/authToggleMethod'

const useRedux = () => {
    // Get Redux state data
    const authState = useSelector((state: RootState) => state.authToggleMethod)
    const notifyState = useSelector((state: RootState) => state.notifyMessage)
    const userState = useSelector((state: RootState) => state.userInformation)
    // For execute Redux function
    const dispatch = useDispatch<AppDispatch>()
    // Clear all data in presist redux and localstorage
    const clearReduxData = () => {
        persistor.purge()
    }
    // Redux Slicer
    const slicer = {
        setUser,
        unsetUser,
        setNotify,
        unsetNotify,
        handleToggleAuth,
        resetToggleAuth
    }

    return { authState, notifyState, userState, slicer, dispatch, clearReduxData }
}

export default useRedux
