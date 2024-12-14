
const HOST_API = "http://localhost:8000";


export const threadList = async () => {
    try {
        const response = await fetch(`${HOST_API}/threads`, {
            method: "GET"
        }).then((res) => res.json())
        .then((data) => data.payload.data)
        .catch((e) => {throw e})
        
        return response
    } catch (error) {
        console.error("Error in retrieving document list", error);
        throw error;
    }
}