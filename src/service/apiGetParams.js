import axios from 'axios';

export async function apiGetParams(request) {
    try {
        const apiResponse = await axios.get('http://localhost:3000/user/' + request);
        const apiUser = apiResponse.data;

        return apiUser;

    } catch (error) {
        console.error(error);
        throw error;
    }
}