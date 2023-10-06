import { createSlice } from "@reduxjs/toolkit";

const CompaniesSlice = createSlice({
    name: 'companies',
    initialState: {
        "companies_array": ''
    },
    reducers: {
        CompaniesFun: (state, action) => {
            state.companies_array = action.payload
        }
    }
});

export const { CompaniesFun } = CompaniesSlice.actions;
export default CompaniesSlice.reducer;