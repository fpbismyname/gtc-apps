import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserInformation } from '~/src/types/User/User'

const getDefaultValueUserInformation = (): UserInformation => ({
    user_uid: null,
    user_token: null,
    user_data: {
        membership: null,
        expired_at: undefined,
        completed_modules: []
    },
    user_information: {
        email: '',
        phone_number: '',
        username: ''
    }
})

const initialState: UserInformation = getDefaultValueUserInformation()

const userInformation = createSlice({
    name: 'userInformation',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserInformation>) => {
            state.user_data = action.payload.user_data
            state.user_information = action.payload.user_information
            state.user_token = action.payload.user_token
            state.user_uid = action.payload.user_uid
        },
        unsetUser: () => getDefaultValueUserInformation()
    }
})

export const { setUser, unsetUser } = userInformation.actions
export default userInformation.reducer
