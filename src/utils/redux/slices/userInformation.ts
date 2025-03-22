import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '~/src/types/userType/User'

const getDefaultValueUserInformation = (): User => ({
    user_uid: null
})

const initialState: User = getDefaultValueUserInformation()

const userInformation = createSlice({
    name: 'userInformation',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user_uid = action.payload.user_uid
        },
        unsetUser: () => getDefaultValueUserInformation()
    }
})

export const { setUser, unsetUser } = userInformation.actions
export default userInformation.reducer
