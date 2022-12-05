import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginInfoSlice"

//!!creating
const store = configureStore({
    reducer:{
        loginInfo:loginReducer
    }
})


export default store;