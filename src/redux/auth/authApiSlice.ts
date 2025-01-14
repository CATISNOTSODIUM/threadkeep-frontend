import { apiSlice } from "../api/apiSlice.ts";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/users/verify',
                method: 'POST',
                body: {...credentials}
            })
        })
    })
})

export const {
    useLoginMutation
} = authApiSlice