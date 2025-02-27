import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Document, T_DocumentAddData} from "modules/types.ts";
import {api1, api2} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";

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
        const response = await api2.documents.documentsRead(id) as AxiosResponse<T_Document>
        return response.data
    }
)

export const fetchDocuments = createAsyncThunk<T_Document[], object, AsyncThunkConfig>(
    "fetch_documents",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api2.documents.documentsList({
            document_name: state.documents.document_name
        }) as AxiosResponse<T_Document[]>

        return response.data
    }
)

export const addDocumentToRequest = createAsyncThunk<void, string, AsyncThunkConfig>(
    "documents/add_document_to_request",
    async function(document_id) {
        await api1.documents.documentsAddToRequestCreate(document_id)
    }
)

export const deleteDocument = createAsyncThunk<T_Document[], string, AsyncThunkConfig>(
    "delete_document",
    async function(document_id) {
        const response = await api1.documents.documentsDeleteDelete(document_id) as AxiosResponse<T_Document[]>
        return response.data
    }
)

export const updateDocument = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_document",
    async function({document_id, data}) {
        await api1.documents.documentsUpdateUpdate(document_id as string, data as Document)
    }
)

export const updateDocumentImage = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_document_image",
    async function({document_id, data}) {
        await api1.documents.documentsUpdateImageCreate(document_id as string, data as {image?: File})
    }
)

export const createDocument = createAsyncThunk<void, T_DocumentAddData, AsyncThunkConfig>(
    "update_document",
    async function(data) {
        await api1.documents.documentsCreateCreate(data)
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
        builder.addCase(deleteDocument.fulfilled, (state:T_DocumentsSlice, action: PayloadAction<T_Document[]>) => {
            state.documents = action.payload
        });
    }
})

export const { updateDocumentName, removeSelectedDocument} = documentsSlice.actions;

export default documentsSlice.reducer