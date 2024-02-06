import { configureStore } from "@reduxjs/toolkit";

import UserProfileReducer from '../Slice/UserProfileSlice'
import ConnectionsReducer from "../Slice/ConnectionsSlice";

export const Store=configureStore({
    reducer:{
        UserProfileReducer:UserProfileReducer,
        ConnectionsReducer:ConnectionsReducer,
    }
});