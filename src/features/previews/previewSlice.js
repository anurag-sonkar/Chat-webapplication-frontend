import { createSlice } from '@reduxjs/toolkit';

const previewSlice = createSlice({
    name: 'preview',
    initialState: {
        preview : null,
    },
    reducers: {
        addPreview: (state, action) => {
            // console.log(action.payload)
            state.preview = action.payload;
        },
        
        clearPreview: (state) => {
            state.preview = null;
        },
        
        
    },
});

export const { addPreview, clearPreview,} = previewSlice.actions;
export default previewSlice.reducer;
