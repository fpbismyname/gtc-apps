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
        },
        resetToggleAuth: () => initialState
    }
})

export const { handleToggleAuth, resetToggleAuth } = authSlice.actions
export default authSlice.reducer
