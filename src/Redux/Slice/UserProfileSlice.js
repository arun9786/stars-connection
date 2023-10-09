import { createSlice } from "@reduxjs/toolkit";

const UserProfileSlice = createSlice({
    name: 'User Details',
    initialState: {
        personal: '',
        address:'',
        curriculumn:'',
        company:'',
    },
    reducers: {
        PersonalDetailsFun: (state, action) => {
            state.personal=action.payload
        },
        AddressDetailsFun:(state, action)=>{
            state.address=action.payload
        },
        CurriculumDetailsFun:(state, action)=>{
            state.curriculumn=action.payload
        },
        CompanyDetailsFun:(state, action)=>{
            state.company=action.payload
        }
    }
});

export const { PersonalDetailsFun, AddressDetailsFun, CurriculumDetailsFun, CompanyDetailsFun } =UserProfileSlice.actions;
export default UserProfileSlice.reducer;