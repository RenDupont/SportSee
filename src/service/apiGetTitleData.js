import { apiGetParams } from './apiGetParams';

export async function getTitleData(request) {
    if (/^\d+$/.test(request)) {
        try {
            const apiUser = await apiGetParams(request);

            if (apiUser) {
                const { userInfos } = apiUser.data;
                return userInfos;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    return null;
}