import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { setCredentials, logOut } from "../auth/authSlice.ts"
import { RootState } from "../store.ts"
const HOST_API = process.env.REACT_APP_BACKEND_API


const baseQuery = fetchBaseQuery({
    baseUrl: HOST_API,
    credentials: 'include', 
    prepareHeaders(headers, { getState }) {
        const token = (getState() as RootState).auth.jwtToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

// reauthorization to refresh token
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 403) {
        // send refresh token to get new access token
        const refreshResult = await baseQuery('/users/refresh', api, extraOptions)
        if (refreshResult?.data) {
            api.dispatch(setCredentials({...refreshResult.data}))
            // retry with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }   
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})