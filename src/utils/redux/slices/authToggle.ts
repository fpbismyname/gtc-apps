import { createSlice } from '@reduxjs/toolkit'

interface initialState {
    toggleAuth: boolean
}

const initialState: initialState = {
    toggleAuth: false
}

const authSlice = createSlice({
    name: 'authToggle',
    initialState,
    reducers: {
        handleToggleAuth(state) {
            state.toggleAuth = !state.toggleAuth
        }
    }
})

export const { handleToggleAuth } = authSlice.actions
export default authSlice.reducer
