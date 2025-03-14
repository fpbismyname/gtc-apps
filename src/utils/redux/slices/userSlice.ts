import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userType {
    userUID: string | null;
    userToken: string | null;
}
const initialState:userType =  {
    userUID: null,
    userToken: null
}

const userSlice = createSlice({
    name:"userUID",
    initialState,
    reducers:{
        setUser: (state, action:PayloadAction<userType>)=>{
            const {userUID, userToken} =action.payload
            state.userUID = userUID
            state.userToken = userToken
        },
        unsetUser: (state)=>{
            state.userUID = null
            state.userToken = null
        }
    }
})

export const {setUser, unsetUser} = userSlice.actions
export default userSlice.reducer