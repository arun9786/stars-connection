import { createSlice } from "@reduxjs/toolkit";

const CitiesSlice=createSlice({
    name:'all-country-cities',
    initialState:{
        cities:''
    },
    reducers:{
        CitiesFun:(state,action)=>{
            state.cities=action.payload
        }
    }
});

export const {CitiesFun} =CitiesSlice.actions;
export default CitiesSlice.reducer;