import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userReducer from "./slices/userSlice.ts"
import requestsReducer from "./slices/requestsSlice.ts"
import documentsReducer from "./slices/documentsSlice.ts"

export const store = configureStore({
    reducer: {
        user: userReducer,
        requests: requestsReducer,
        documents: documentsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, never, never>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;