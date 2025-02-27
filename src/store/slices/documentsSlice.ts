import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Document, T_DocumentsListResponse} from "modules/types.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {api} from "modules/api.ts";
import {AxiosResponse} from "axios";
import {saveRequest} from "store/slices/requestsSlice.ts";

type T_DocumentsSlice = {
    document_name: string
    document: null | T_Document
    documents: T_Document[]
}

const initialState:T_DocumentsSlice = {
    document_name: "",
    document: null,
    documents: []
}

export const fetchDocument = createAsyncThunk<T_Document, string, AsyncThunkConfig>(
    "fetch_document",
    async function(id) {
        const response = await api.documents.documentsRead(id) as AxiosResponse<T_Document>
        return response.data
    }
)

export const fetchDocuments = createAsyncThunk<T_Document[], object, AsyncThunkConfig>(
    "fetch_documents",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.documents.documentsList({
            document_name: state.documents.document_name
        }) as AxiosResponse<T_Document[]>

        return response.data
    }
)

export const addDocumentToRequest = createAsyncThunk<void, string, AsyncThunkConfig>(
    "documents/add_document_to_request",
    async function(document_id) {
        await api.documents.documentsAddToRequestCreate(document_id)
    }
)

const documentsSlice = createSlice({
    name: 'documents',
    initialState: initialState,
    reducers: {
        updateDocumentName: (state, action) => {
            state.document_name = action.payload
        },
        removeSelectedDocument: (state) => {
            state.document = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDocuments.fulfilled, (state:T_DocumentsSlice, action: PayloadAction<T_Document[]>) => {
            state.documents = action.payload
        });
        builder.addCase(fetchDocument.fulfilled, (state:T_DocumentsSlice, action: PayloadAction<T_Document>) => {
            state.document = action.payload
        });
    }
})

export const { updateDocumentName, removeSelectedDocument} = documentsSlice.actions;

export default documentsSlice.reducer