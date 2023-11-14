import { RadialBarChart, RadialBar } from 'recharts';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
/*import { getScoreRadialBarData } from '../../service/apiGetScoreRadialBarData';*/
import ApiService from '../../service/apiService';
import Classes from './ScoreRadialBarChart.module.css';

function RadialBarChartExample() {
    const { id } = useParams();
    const [dataUser, setDataUser] = useState();
    const [error, setError] = useState();

    const fetchData = useCallback(async () => {
        try {
            const apiServiceInstance = new ApiService();
            const fetchedUserData  = await apiServiceInstance.getScoreRadialBarData(id);

            if (fetchedUserData) {
                setDataUser(fetchedUserData);
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

    
    const score = (percentageScore) => [
        { fill: '#FF0000', name: 'Score', value: percentageScore },
        { fill: '#FBFBFB', name: 'Empty', value: 100 },
    ];

    return (
        <div className={Classes.scoreRadialBarChart}>
            {error ? (
                <div className={Classes.errorMessage}>
                    <p>{error}</p>
                </div>
            ) : (
                dataUser && (
                    <>
                        <RadialBarChart width={258} height={263} innerRadius={80} outerRadius={109} startAngle={200} endAngle={-160} barSize={10} data={score(dataUser)}>
                            <RadialBar background={false} clockWise={true} dataKey="value" />
                        </RadialBarChart>
                        <div className={Classes.objectif}>
                            <span className={Classes.objectif_value}>{dataUser}%</span>
                            <span className={Classes.objectif_text}>de votre objectif</span>
                        </div>
                        <span className={Classes.legend}>Score</span>
                    </>
                )
            )}
        </div>
    );
}

export default RadialBarChartExample;