import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '~/src/types/User/User'

const initialState: User = {
    user: {
        userToken: null,
        userUID: null,
        userData: {
            doneModule: {
                idModule: []
            },
            lifeTime: null,
            member: 'new_user'
        }
    }
}

const userInformation = createSlice({
    name: 'userInformation',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload.user
        },
        unsetUser: () => initialState
    }
})

export const { setUser, unsetUser } = userInformation.actions
export default userInformation.reducer
