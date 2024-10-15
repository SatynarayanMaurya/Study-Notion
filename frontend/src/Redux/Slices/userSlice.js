import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    userId : localStorage.getItem("userId") || null,
    courseId : localStorage.getItem("courseId") || null,
    accountType: localStorage.getItem("accountType") || null,
    profileImage :localStorage.getItem("profileImage") || null,

}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        
        setUserId :(state,actions)=>{
            state.userId = actions.payload
        },
        setCourseId :(state,actions)=>{
            state.courseId = actions.payload
        },
        setAccountType :(state,actions)=>{
            state.accountType = actions.payload
        },
        setProfileImage :(state,actions)=>{
            state.profileImage = actions.payload
        },
    }
})


export const {setUserId,setCourseId, setAccountType,setProfileImage} = userSlice.actions

export default userSlice.reducer