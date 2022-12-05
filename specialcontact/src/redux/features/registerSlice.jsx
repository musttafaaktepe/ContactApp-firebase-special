import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    
};

const registerSlice = createSlice({
    name:"register",
    initialState:initialStates,
    reducers:{
        registerInformation:(state,action)=>{
            state.registerInfo = true;
            state.firstName=action.payload.firstName;
            state.lastName=action.payload.lastName;
            state.email=action.payload.email;
            state.password=action.payload.password;            
        },
        afterRegister:(state,action) => {
            state=initialStates;
        }
        
    }
})

export const {registerInformation, afterRegister} = registerSlice.actions;
export default registerSlice.reducer
