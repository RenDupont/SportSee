import { apiGetParams } from './apiGetParams';

export async function getScoreRadialBarData(request) {
    if (/^\d+$/.test(request)) {
        try {
            const apiUser = await apiGetParams(request);

            if (apiUser) {
                const { todayScore, score } = apiUser.data;

                const normalizedTodayScore = todayScore || score;

                return normalizedTodayScore * 100;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    return null;
}