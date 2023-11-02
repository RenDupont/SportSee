import axios from 'axios';

export async function fetchUserData(id) {
    try {
        const userDataResponse = await axios.get('../../mock/userData.json');
        const userData = userDataResponse.data.find(user => user.id === parseInt(id, 10));
        
        return userData;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}