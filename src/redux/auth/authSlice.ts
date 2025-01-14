import {createSlice} from "@reduxjs/toolkit"
import Cookies from 'js-cookie'
const COOKIE_EXPIRATION_DAY = process.env.COOKIE_EXPIRATION_DAY ?? 7;

const authSlice = createSlice( {
    name: 'auth',
    initialState: {
        name: Cookies.get('name'),
        id: Cookies.get('id'),
        jwtToken: Cookies.get('jwtToken') 
    },
    reducers: {
        setCredentials: (state, action) => {
            const {name, id, jwt_token} = action.payload.data;
            state.name = name;
            state.id = id
            state.jwtToken = jwt_token;

            // set Cookies
            const cookieOptions = {
                expires: COOKIE_EXPIRATION_DAY,
                secure: true
            }
            Cookies.set('name', name, cookieOptions);
            Cookies.set('id', id, cookieOptions);
            Cookies.set('jwtToken', jwt_token, cookieOptions);
        },
        logOut: (state) => {
            state.name = null
            state.id = null
            state.jwtToken = null
        }
    }
})

export const {setCredentials, logOut} = authSlice.actions;
export default authSlice.reducer;
// Selector
export const selectCurrentname = (state) => state.auth.name;
export const selectCurrentid = (state) => state.auth.id;
export const selectCurrentjwtToken = (state) => state.auth.jwtToken;