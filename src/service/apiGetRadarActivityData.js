import { apiGetParams } from './apiGetParams';

export async function getRadarActivityData(request) {

    if (/^\d+\/performance$/.test(request)) {
            
        try {
            const apiUser = await apiGetParams(request);

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

        return null;
    }
}