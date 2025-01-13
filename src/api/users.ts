import { defaultUser, User } from "../models/index.ts";
import { Optional } from "./types"

const HOST_API = process.env.REACT_APP_BACKEND_API

/* 
    /users is public (no JWT token required)
*/

export async function verifyUser(
    username: string,
    password: string
): Promise<Optional<boolean>>{
    try {
        const response = await fetch(`${HOST_API}/users/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
               name: username,
               password: password
            })
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = (await response.json()).payload.data;
        if (data.name === undefined) {
            throw new Error(`Invalid request.`);
        }

        localStorage.setItem("isLogin", "true");
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userID", data.id);
        localStorage.setItem("jwtToken", data.jwt_token);

        return {
            data: true,
            error: null
        }

    } catch (error) {
        return {
            data: false,
            error: error instanceof Error ? error.message : String(error)
        }
    }
}

export async function createUser(
    username: string,
    password: string
): Promise<Optional<User>>{
    try {
        const response = await fetch(`${HOST_API}/users/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
               name: username,
               password: password
            }),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = (await response.json());
        return {
            data: data.payload.data,
            error: null
        }
        
    } catch (error) {
        return {
            data: defaultUser,
            error: error instanceof Error ? error.message : String(error)
        }
    }
}
