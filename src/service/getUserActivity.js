import axios from 'axios';

export async function fetchUserActivity(id) {
    try {
        const userActivityResponse = await axios.get('../../mock/userActivity.json');
        const userActivity = userActivityResponse.data.find(user => user.id === parseInt(id, 10));

        return userActivity;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}