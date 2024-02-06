import { createSlice } from "@reduxjs/toolkit";

const ConnectionsSlice = createSlice({
    name: 'connectioms',
    initialState: {
        "connections_array": ''
    },
    reducers: {
        ConnectionsFun: (state, action) => {
            state.connections_array = action.payload
        }
    }
});

export const { ConnectionsFun } = ConnectionsSlice.actions;
export default ConnectionsSlice.reducer;