import { apiGetParams } from './apiGetParams';

const dayConverter = (day) => {
    const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];
    return daysOfWeek[day - 1];
}

export async function getLinearChartData(request) {
    if (/^\d+\/average-sessions$/.test(request)) {
        try {
            const apiUser = await apiGetParams(request);

            if (apiUser) {
                const { sessions } = apiUser.data;

                const normalizedUserAvgSessions = {
                    sessions: sessions.map(it => ({
                        day: dayConverter(it.day),
                        sessionLength: it.sessionLength
                    }))
                };

                return normalizedUserAvgSessions;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    return null;
}