import { useState } from 'react'
import { User } from '../../types/User/User'
import useRedux from '../Redux/useRedux'

const useUser = () => {
    // Get state from Redux
    const { dispatch, slicer, userState } = useRedux()
    // function to setUser
    const setUser = (newUser: Partial<User>) => {
        const mergedUser = {
            ...userState,
            ...newUser
        }
        dispatch(slicer.setUser(mergedUser))
    }
    // function to unsetUser
    const unsetUser = () => {
        dispatch(slicer.unsetUser())
    }
    //return user utility
    return { setUser, unsetUser }
}

export default useUser
