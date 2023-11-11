import { apiGetParams } from './apiGetParams';

export async function getMacronutrientData(request) {
    if (/^\d+$/.test(request)) {
        try {
            const apiUser = await apiGetParams(request);

            if (apiUser) {
                const { keyData } = apiUser.data;

                return keyData;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    return null;
}