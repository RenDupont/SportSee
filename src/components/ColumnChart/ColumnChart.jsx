import Classes from './ColumnChart.module.css'
import { 
    BarChart, Bar, XAxis,
    YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer 
} from "recharts";
import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { normalizeUserDataApi } from '../../service/apiService';

function ColumnChart() {

    const { id } = useParams();
    const [userDataActivity, setUserDataActivity] = useState();

    const fetchData = useCallback(async () => {
        try {
            const fetchedUserData  = await normalizeUserDataApi(`${id}/activity`);

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
    /*let minKilo = 0;

    if (data) {
        data.sessions.forEach( it => {
            maxKilo = Math.max(maxKilo, it.kilogram);
            minKilo = Math.min(minKilo, it.kilogram);
        });
    }*/

    return (
        <div className={Classes.columnChart}>
            {userDataActivity ? (
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={userDataActivity.sessions}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis dataKey='kilogram' domain={[0, ((maxKilo / 10) *10) + 10]} orientation='right'/>
                        <Tooltip />
                        <Legend wrapperStyle={{ bottom: 295, left: 545}} />
                        <Bar dataKey="kilogram" name="Poids (kg)" fill="#282D30" barSize={10} shape={"round"} />
                        <Bar dataKey="calories" name="Calories brûlées (kCal)" fill="#E60000" barSize={10} shape={"round"} />
                    </BarChart>
                </ResponsiveContainer>
            ) : null}
        </div>
    );
}

export default ColumnChart;