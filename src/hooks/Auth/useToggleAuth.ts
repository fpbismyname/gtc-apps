import { useCallback } from 'react'
import useRedux from '../Redux/useRedux'

const useToggleAuth = () => {
    // Get state form Redux
    const { authState, slicer, dispatch } = useRedux()
    const { toggleAuth } = authState
    // Function to change auth method
    const changeAuthMethod = useCallback(() => dispatch(slicer.handleToggleAuth()), [toggleAuth])
    // Return toggle auth and function change auth method
    return { toggleAuth, changeAuthMethod }
}

export default useToggleAuth
