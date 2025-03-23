import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { notifyInterface } from '~/src/types/otherTypes/typeNotify'

const initialState: notifyInterface = {
    loading: false,
    message: null,
    type: null
}

const notifyMessage = createSlice({
    name: 'notifyMessage',
    initialState,
    reducers: {
        setNotify: (state, action: PayloadAction<notifyInterface>) => {
            state.loading = action.payload.loading
            state.message = action.payload.message
            state.type = action.payload.type
        },
        unsetNotify: () => initialState
    }
})

export const { setNotify, unsetNotify } = notifyMessage.actions
export default notifyMessage.reducer
