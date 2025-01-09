const HOST_API = process.env.REACT_APP_BACKEND_API

// api/users is public (no JWT token required)

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
            return res.json()
                .then((data) => data)
                .catch((e) => {console.error(e)})
        })
        // check name
        const data = response.payload.data
        if (data.name === undefined) {
            return false // invalid user
        } else {
            // store data in local storage
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("userName", data.name);
            localStorage.setItem("userID", data.id);
            localStorage.setItem("jwtToken", data.jwt_token);
            return true
        }

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
