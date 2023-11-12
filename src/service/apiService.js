import axios from 'axios';

export default class apiService {

    constructor() {
        this.urlApi = 'http://localhost:3000/user/';
    }

    async getTitleData(request) {
        try {
            const apiResponse = await axios.get(this.urlApi + request);
            const apiUser = apiResponse.data;
    
            if (apiUser) {
                const { userInfos } = apiUser.data;
                return userInfos;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async getScoreRadialBarData(request) {
        try {
            const apiResponse = await axios.get(this.urlApi + request);
            const apiUser = apiResponse.data;
    
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

    async getRadarActivityData(request) {
        try {
            const apiResponse = await axios.get(this.urlApi + request);
            const apiUser = apiResponse.data;
    
            if (apiUser) {
                const { data } = apiUser.data;

                const kindMapping = {
                    1: "Cardio",
                    2: "Energie",
                    3: "Endurance",
                    4: "Force",
                    5: "Vitesse",
                    6: "Intensite"
                };

                const kindObject = {};
                const reversedKindObject = {}; // reverse to match ui mockup

                data.forEach(item => {
                    kindObject[kindMapping[item.kind]] = item.value;
                });

                const keys = Object.keys(kindObject).reverse();

                keys.forEach(key => {
                    reversedKindObject[key] = kindObject[key];
                });

                const normalizedUserPerformance = {
                    kind: reversedKindObject
                };

                return normalizedUserPerformance;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async getMacronutrientData(request) {
        try {
            const apiResponse = await axios.get(this.urlApi + request);
            const apiUser = apiResponse.data;
    
            if (apiUser) {
                const { keyData } = apiUser.data;

                return keyData;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async getLinearChartData(request) {

        const dayConverter = (day) => {
            const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];
            return daysOfWeek[day - 1];
        }

        try {
            const apiResponse = await axios.get(this.urlApi + request);
            const apiUser = apiResponse.data;
    
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

    async getColumnChartData(request) {
        try {
            const apiResponse = await axios.get(this.urlApi + request);
            const apiUser = apiResponse.data;
    
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

}