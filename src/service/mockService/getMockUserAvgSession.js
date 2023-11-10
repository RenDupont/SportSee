import axios from 'axios';

export async function fetchUserAvgSession(id) {
    try {
        const userAvgSessionResponse = await axios.get('../../mock/userAverageSession.json');
        const userAverageSession = userAvgSessionResponse.data.find(user => user.id === parseInt(id, 10));

        return userAverageSession;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}