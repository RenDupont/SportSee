import axios from 'axios';

export async function fetchUserData(id) {
    try {
        const userDataResponse = await axios.get('../../mock/userData.json');
        const userActivityResponse = await axios.get('../../mock/userActivity.json');
        const userAvgSessionResponse = await axios.get('../../mock/userAverageSession.json');
        const userPerformanceResponse = await axios.get('../../mock/userPerformance.json');

        const userData = userDataResponse.data.find(user => user.id === parseInt(id, 10));
        const userActivity = userActivityResponse.data.find(user => user.id === parseInt(id, 10));
        const userAverageSession = userAvgSessionResponse.data.find(user => user.id === parseInt(id, 10));
        const userPerformance = userPerformanceResponse.data.find(user => user.id === parseInt(id, 10));

        return {
            userData,
            userActivity,
            userAverageSession,
            userPerformance,
        };
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}