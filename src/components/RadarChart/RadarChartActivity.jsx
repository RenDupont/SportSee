import { Radar, RadarChart, PolarGrid,  
    PolarAngleAxis } from 'recharts'; 
import Classes from './RadarChartActivity.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
/*import { getRadarActivityData } from '../../service/apiGetRadarActivityData';*/
import ApiService from '../../service/apiService';

function RadarChartActivity() {

    const { id } = useParams();
    const [userDataPerformance, setUserDataPerformance] = useState();
    const [error, setError] = useState();

    const fetchData = useCallback(async () => {
        try {
            const apiServiceInstance = new ApiService();
            const fetchedUserData  = await apiServiceInstance.getRadarActivityData(`${id}/performance`);

            if (fetchedUserData) {
                setUserDataPerformance(fetchedUserData);
            } else {
                setError('data not find...');
            }

        } catch (error) {
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const dataPoints = () => {
        return Object.keys(userDataPerformance.kind).map((category) => ({
            name: category,
            value: userDataPerformance.kind[category],
        }));
    };

    return (
        <div className={Classes.radarChart}>
            {error ? (
                <div className={Classes.errorMessage}>
                    <p>{error}</p>
                </div>
            ) : (
                    userDataPerformance && (
                        <>
                            <RadarChart width={258} height={263} cx="50%" cy="50%" outerRadius="70%" data={dataPoints()} >
                                <PolarGrid radialLines={false} />
                                <PolarAngleAxis dataKey="name" tick={{ fill: 'white' }} />
                                <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
                            </RadarChart>
                        </>
                    )
            )}
        </div>
    );
}

export default RadarChartActivity;