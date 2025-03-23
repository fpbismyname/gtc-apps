import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '~/src/types/userType/UserType'

const getDefaultValueUserInformation = (): UserType => ({
    user_id: null
})

const initialState: UserType = getDefaultValueUserInformation()

const userInformation = createSlice({
    name: 'userInformation',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserType>) => {
            state.user_id = action.payload.user_id
        },
        unsetUser: () => getDefaultValueUserInformation()
    }
})

export const { setUser, unsetUser } = userInformation.actions
export default userInformation.reducer
