import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./Auth-Slice/index";
import AdminSlice from "./Admin-Slice";


const store = configureStore({
    reducer:{
        auth:authReducer,
        admin:AdminSlice
    }
})

export default store;