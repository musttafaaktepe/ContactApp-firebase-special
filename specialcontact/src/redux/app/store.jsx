import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginInfoSlice"
import registerReducer from "../features/registerSlice"

//!!creating
const store = configureStore({
    reducer:{
        loginInfo:loginReducer,
        registerInfo:registerReducer
    }
})


export default store;