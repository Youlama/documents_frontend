import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {E_RequestStatus, T_Request, T_RequestsFilters, T_Document, T_RequestCart} from "modules/types.ts";
import {NEXT_MONTH, PREV_MONTH} from "modules/consts.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";
import {api1} from "modules/api.ts";

type T_RequestsSlice = {
    draft_request_id: number | null,
    documents_count: number | null,
    request: T_Request | null,
    requests: T_Request[],
    filters: T_RequestsFilters,
    save_mm: boolean
}

const initialState:T_RequestsSlice = {
    draft_request_id: null,
    documents_count: null,
    request: null,
    requests: [],
    filters: {
        status: 0,
        date_formation_start: PREV_MONTH.toISOString().split('T')[0],
        date_formation_end: NEXT_MONTH.toISOString().split('T')[0],
        owner: ""
    },
    save_mm: false
}

export const fetchCart = createAsyncThunk<T_RequestCart, void, AsyncThunkConfig>(
    "requests/cart",
    async function() {
        const response = await api1.cart.cartList() as AxiosResponse<T_RequestCart>
        return response.data
    }
)

export const fetchRequest = createAsyncThunk<T_Request, string, AsyncThunkConfig>(
    "requests/request",
    async function(request_id) {
        const response = await api1.requests.requestsRead(request_id) as AxiosResponse<T_Request>
        return response.data
    }
)

export const fetchRequests = createAsyncThunk<T_Request[], object, AsyncThunkConfig>(
    "requests/requests",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api1.requests.requestsList({
            status: state.requests.filters.status,
            date_formation_start: state.requests.filters.date_formation_start,
            date_formation_end: state.requests.filters.date_formation_end
        }) as AxiosResponse<T_Request[]>

        return response.data.filter(request => request.owner.includes(state.requests.filters.owner))
    }
)

export const removeDocumentFromDraftRequest = createAsyncThunk<T_Document[], string, AsyncThunkConfig>(
    "requests/remove_document",
    async function(document_id, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api1.requests.requestsDeleteDocumentDelete(state.requests.request.id, document_id) as AxiosResponse<T_Document[]>
        return response.data
    }
)

export const deleteDraftRequest = createAsyncThunk<void, object, AsyncThunkConfig>(
    "requests/delete_draft_request",
    async function(_, {getState}) {
        const state = getState()
        await api1.requests.requestsDeleteDelete(state.requests.request.id)
    }
)

export const sendDraftRequest = createAsyncThunk<void, object, AsyncThunkConfig>(
    "requests/send_draft_request",
    async function(_, {getState}) {
        const state = getState()
        await api1.requests.requestsUpdateStatusUserUpdate(state.requests.request.id)
    }
)

export const updateRequest = createAsyncThunk<void, object, AsyncThunkConfig>(
    "requests/update_request",
    async function(data, {getState}) {
        const state = getState()
        await api1.requests.requestsUpdateUpdate(state.requests.request.id, {
            ...data
        })
    }
)

export const updateDocumentValue = createAsyncThunk<void, object, AsyncThunkConfig>(
    "requests/update_mm_value",
    async function({document_id, comment},thunkAPI) {
        const state = thunkAPI.getState()
        await api1.requests.requestsUpdateDocumentUpdate(state.requests.request.id, document_id, {comment})
    }
)

export const acceptRequest = createAsyncThunk<void, string, AsyncThunkConfig>(
    "requests/accept_request",
    async function(request_id,{dispatch}) {
        await api1.requests.requestsUpdateStatusAdminUpdate(request_id, {status: E_RequestStatus.Completed})
        await dispatch(fetchRequests)
    }
)

export const rejectRequest = createAsyncThunk<void, string, AsyncThunkConfig>(
    "requests/accept_request",
    async function(request_id,{dispatch}) {
        await api1.requests.requestsUpdateStatusAdminUpdate(request_id, {status: E_RequestStatus.Rejected})
        await dispatch(fetchRequests)
    }
)

const requestsSlice = createSlice({
    name: 'requests',
    initialState: initialState,
    reducers: {
        removeRequest: (state) => {
            state.request = null
        },
        triggerUpdateMM: (state) => {
            state.save_mm = !state.save_mm
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (state:T_RequestsSlice, action) => {
            state.documents_count = action.payload.documents_count
            state.draft_request_id = action.payload.draft_request_id
        });
        builder.addCase(fetchRequest.fulfilled, (state:T_RequestsSlice, action: PayloadAction<T_Request>) => {
            state.request = action.payload
        });
        builder.addCase(fetchRequests.fulfilled, (state:T_RequestsSlice, action: PayloadAction<T_Request[]>) => {
            state.requests = action.payload
        });
        builder.addCase(removeDocumentFromDraftRequest.rejected, (state:T_RequestsSlice) => {
            state.request = null
        });
        builder.addCase(removeDocumentFromDraftRequest.fulfilled, (state:T_RequestsSlice, action: PayloadAction<T_Document[]>) => {
            if (state.request) {
                state.request.documents = action.payload as T_Document[]
            }
        });
        builder.addCase(sendDraftRequest.fulfilled, (state:T_RequestsSlice) => {
            state.request = null
        });
    }
})

export const { removeRequest, triggerUpdateMM, updateFilters } = requestsSlice.actions;

export default requestsSlice.reducer