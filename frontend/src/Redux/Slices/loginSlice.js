import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    token : localStorage.getItem("token")  || null,
    loading :false

}

const loginSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token = action.payload
        },
        setLoading:(state, actions)=>{
            state.loading = actions.payload
        }
    }
})

export const { setToken ,setLoading} = loginSlice.actions

export default loginSlice.reducer