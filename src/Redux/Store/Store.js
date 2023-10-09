import { configureStore } from "@reduxjs/toolkit";

import UserProfileReducer from '../Slice/UserProfileSlice'
import CompaniesReducer from '../Slice/CompaniesSlice'
import CitiesReducer from "../Slice/CitiesSlice";

export const Store=configureStore({
    reducer:{
        UserProfileReducer:UserProfileReducer,
        CompaniesReducer:CompaniesReducer,
        CitiesReducer:CitiesReducer,
    }
});