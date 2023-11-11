import { apiGetParams } from './apiGetParams';

export async function getColumnChartData(request) {
    if (/^\d+\/activity$/.test(request)) {
        try {
            const apiUser = await apiGetParams(request);

            if (apiUser) {
                const { sessions } = apiUser.data;

                const normalizedUserActivity = {
                    sessions: sessions.map(it => ({
                        day: it.day.substring(9, 10),
                        kilogram: it.kilogram,
                        calories: it.calories
                    }))
                };

                return normalizedUserActivity;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    return null;
}