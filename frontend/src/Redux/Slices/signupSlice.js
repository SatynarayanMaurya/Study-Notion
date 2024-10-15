import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData :null,
    resetPasswordEmail : null
}
const signupSlice = createSlice({
    name:"signup",
    initialState,
    reducers:{
        setSignupData:(state,actions)=>{
            state.signupData = actions.payload
        },
        setResetPasswordEmail :(state,actions)=>{
            state.resetPasswordEmail = actions.payload
        }
    }
})

export const { setSignupData,setResetPasswordEmail } = signupSlice.actions

export default signupSlice.reducer