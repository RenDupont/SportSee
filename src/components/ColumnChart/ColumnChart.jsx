import Classes from './ColumnChart.module.css'
import { 
    BarChart, Bar, XAxis,
    YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer 
} from "recharts";
import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
/*import { getColumnChartData } from '../../service/apiGetColumnChartData';*/
import ApiService from '../../service/apiService';


function ColumnChart() {

    const { id } = useParams();
    const [userDataActivity, setUserDataActivity] = useState();

    const fetchData = useCallback(async () => {
        try {
            const apiServiceInstance = new ApiService();
            const fetchedUserData  = await apiServiceInstance.getColumnChartData(`${id}/activity`);

            if (fetchedUserData) {
                setUserDataActivity(fetchedUserData);
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

    let maxKilo = 80;
    let minKilo = Number.MAX_VALUE;

    if (userDataActivity) {
        userDataActivity.sessions.forEach( it => {
            maxKilo = Math.max(maxKilo, it.kilogram);
            minKilo = Math.min(minKilo, it.kilogram);
        });
    }

    const CustomTooltip = ({ active, payload, label }) => {
    
        if (active && payload && payload.length) {
            return (
                <div className={Classes.chartTooltip}>
                    <span>{`${payload[0].value}kg`}</span>
                    <p>{`${payload[1].value}kCal`}</p>
                </div>
            );
        }
    }

    return (
        <div className={Classes.columnChart}>
            {userDataActivity && (
                <>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={userDataActivity.sessions} barGap="10%">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis dataKey="kilogram" domain={[minKilo - 10, (Math.ceil(maxKilo / 10) * 10)]} yAxisId="left"  orientation="right" allowDataOverflow />
                            <YAxis dataKey="calories" domain={[0, 400]} yAxisId="right" orientation="left" className={Classes.hideAxeY} />
                            <Tooltip content={CustomTooltip} />
                            <Legend iconSize={10} formatter={(value, entry, index) => (<span className={Classes.legend}>{value}</span>) } wrapperStyle={{ bottom: 295, left: 545}} />
                            <Bar yAxisId="left" dataKey="kilogram" name="Poids (kg)" fill="#282D30" barSize={8} legendType='circle' radius={3} />
                            <Bar yAxisId="right" dataKey="calories" name="Calories brûlées (kCal)" fill="#E60000" barSize={8} shape={"round"} legendType='circle' radius={3} />
                        </BarChart>
                    </ResponsiveContainer>
                    <span className={Classes.description}>Activité quotidienne</span>
                </>
            )}
        </div>
    );
}

export default ColumnChart;