import { RadialBarChart, RadialBar, Legend } from 'recharts';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { normalizeUserDataApi } from '../../service/apiService';
import Classes from './ScoreRadialBarChart.module.css';

function RadialBarChartExample() {
    const { id } = useParams();
    const [dataUser, setDataUser] = useState();

    const fetchData = useCallback(async () => {
        try {
            const fetchedUserData  = await normalizeUserDataApi(id);

            if (fetchedUserData) {
                setDataUser(fetchedUserData);
            } else {
                console.log("Utilisateur non trouvé.");
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
        { fill: '#FBFBFB', name: 'Empty', value: 100 - percentageScore },
    ];

    const style = {
        top: '20%',
        left: '15px',
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
        color:'#20253A',
    };

    return (
        <div className={Classes.scoreRadialBarChart}>
            {dataUser ? (
                <>
                    <RadialBarChart width={258} height={263} innerRadius={80} outerRadius={109} startAngle={200} endAngle={-160} barSize={10} data={score(dataUser.score * 100)}>
                        <RadialBar background clockWise={true} dataKey="value" />
                        <Legend iconSize={0} layout="vertical" verticalAlign="top" align="left" wrapperStyle={style}/>
                    </RadialBarChart>
                    <p className={Classes.objectif}>{dataUser.score * 100}% de votre objectif</p>
                </>
            ) :null}
        </div>
    );
}

export default RadialBarChartExample;