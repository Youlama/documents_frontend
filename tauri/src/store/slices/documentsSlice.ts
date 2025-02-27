import {createSlice} from "@reduxjs/toolkit";

type T_DocumentsSlice = {
    document_name: string
}

const initialState:T_DocumentsSlice = {
    document_name: "",
}


const documentsSlice = createSlice({
    name: 'documents',
    initialState: initialState,
    reducers: {
        updateDocumentName: (state, action) => {
            state.document_name = action.payload
        }
    }
})

export const { updateDocumentName} = documentsSlice.actions;

export default documentsSlice.reducer