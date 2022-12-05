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
            state.firstName=action.firstName;
            state.lastName=action.lastName;
            state.email=action.email;
            state.password=action.payload;            
        },
        afterRegister:(state,action) => {
            state=initialStates;
        }
        
    }
})

export const {registerInformation, afterRegister} = registerSlice.actions;
export default registerSlice.reducer
