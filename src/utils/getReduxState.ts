import { store } from "../redux/store.ts"


export function getJWTToken() {
    const state = store.getState();
    return state.auth.jwtToken;
}

export function getName() {
    const state = store.getState();
    return state.auth.name;
}

export function getID() {
    const state = store.getState();
    return state.auth.id;
}