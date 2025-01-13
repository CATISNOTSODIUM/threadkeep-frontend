import { Tag } from "../models";
import { getJWTToken } from "../utils/jwt.ts"
import { Optional } from "./types.ts";
const HOST_API = process.env.REACT_APP_BACKEND_API


export async function tagList(): Promise<Optional<Tag[]>> {
    try {
        const response = await fetch(`${HOST_API}/threads/tags`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJWTToken()}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            data: data.payload.data,
            error: null
        };

    } catch (error) {
        return {
            data: [],
            error: error instanceof Error ? error.message : String(error)
        };
    }
}


export async function getThreadTags(
    threadID: string
): Promise<Optional<Tag[]>> {
    try {
        const response = await fetch(`${HOST_API}/threads/tags`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJWTToken()}`
            },
            body: JSON.stringify({
                threadID: threadID
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            data: data.payload.data,
            error: null
        };

    } catch (error) {
        return {
            data: [],
            error: error instanceof Error ? error.message : String(error)
        };
    }
}
