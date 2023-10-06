import { createSlice } from "@reduxjs/toolkit";

const CompaniesSlice = createSlice({
    name: 'companies',
    initialState: {
        "companies_array": ''
    },
    reducers: {
        CompainesFun: (state, action) => {
            state.companies_array = action.payload
        }
    }
});

export const { CompainesFun } = CompaniesSlice.actions;
export default CompaniesSlice.reducer;