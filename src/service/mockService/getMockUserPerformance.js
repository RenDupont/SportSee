import axios from 'axios';

export async function fetchUserPerformance(id) {
    try {
        const userPerformanceResponse = await axios.get('../../mock/userPerformance.json');
        const userPerformance = userPerformanceResponse.data.find(user => user.id === parseInt(id, 10));

        return userPerformance;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}