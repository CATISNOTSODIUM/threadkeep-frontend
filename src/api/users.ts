
const HOST_API = "http://localhost:5000";


export const verifyUser = async (username: string, password: string) => {
    try {
        const response = await fetch(`${HOST_API}/users/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
               name: username,
               password: password
            }),
            
        }).then((res) => {
            if (res.status === 200) {
                return res.json()
                    .then((data) => data.payload.data)
                    .catch((e) => {throw e})
            } else {
                return null
            }
        })
        return response
    } catch (error) {
        console.error("Error in retrieving thread", error);
    }
}

export const createUser = async (username: string, password: string) => {
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
        return response
    } catch (error) {
        console.error("Error in retrieving thread", error);
    }
}
