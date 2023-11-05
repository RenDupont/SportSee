import axios from "axios";

export async function normalizeUserDataApi(request) {
    try {
        const apiResponse = await axios.get('http://localhost:3000/user/' + request);
        const apiUser = apiResponse.data;

        const dayConverter = (day) => {
            const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];
            return daysOfWeek[day - 1];
        }

        if (/^\d+$/.test(request)) {

            if (apiUser) {
                const { id, userInfos, todayScore, score, keyData } = apiUser.data;

                const normalizedTodayScore = todayScore || score;

                const normalizedUserData = {
                    id,
                    userInfos,
                    score: normalizedTodayScore,
                    keyData
                };

                return normalizedUserData;
            }

        } else if (/^\d+\/activity$/.test(request)) {
            
            if (apiUser) {
                const { userId, sessions } = apiUser.data;

                const normalizedUserActivity = {
                    id: userId,
                    sessions: sessions.map(it => ({
                        day: it.day.substring(9, 10),
                        kilogram: it.kilogram,
                        calories: it.calories
                    }))
                };

                return normalizedUserActivity;
            }

        } else if (/^\d+\/average-sessions$/.test(request)) {
            
            if (apiUser) {
                const { userId, sessions } = apiUser.data;

                const normalizedUserAvgSessions = {
                    id: userId,
                    sessions: sessions.map(it => ({
                        day: dayConverter(it.day),
                        sessionLength: it.sessionLength
                    }))
                };

                return normalizedUserAvgSessions;
            }

        } else if (/^\d+\/performance$/.test(request)) {
            
            if (apiUser) {
                const { userId, data } = apiUser.data;

                const kindMapping = {
                    1: "Cardio",
                    2: "Energie",
                    3: "Endurance",
                    4: "Force",
                    5: "Vitesse",
                    6: "Intensite"
                };

                const kindObject = {};

                data.forEach(item => {
                    kindObject[kindMapping[item.kind]] = item.value;
                });

                const normalizedUserPerformance = {
                    id: userId,
                    kind: kindObject
                };

                return normalizedUserPerformance;
            }
        } else return null;

    } catch (error) {
        console.error(error);
        throw error;
    }
}