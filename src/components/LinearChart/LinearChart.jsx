import Classes from './LinearChart.module.css';
import { 
    LineChart, Line, XAxis,
    Tooltip, Legend, YAxis
} from 'recharts';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { getLinearChartData } from '../../service/apiGetLinearChartData';

function LinearChart() {

  const { id } = useParams();
  const [userDataAvgSession, setUserDataAvgSession] = useState();

  const fetchData = useCallback(async () => {
        try {
            const fetchedUserData  = await getLinearChartData(`${id}/average-sessions`);

            if (fetchedUserData) {
              setUserDataAvgSession(fetchedUserData);
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


  const CustomTooltip = ({ active, payload, label }) => {
    
    if (active && payload && payload.length) {
      return (
        <div className={Classes.chartTooltip}>
          <p>{`${payload[0].value} min`}</p>
        </div>
      );
    }
  }

    return (
      <div className={Classes.linearChart} >
        {userDataAvgSession && (
          <>
            <LineChart width={258} height={263} data={userDataAvgSession.sessions}>
              <XAxis 
                dataKey="day" tick={{ fill: '#FFFFFF', opacity: '0.5' }} 
                axisLine={false} tickLine={false} tickFormatter={(value) => value} 
              />
              <YAxis domain={[-10, 100]} hide={true} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="natural" strokeWidth={2} stroke='#FFFFFF' dataKey="sessionLength" dot={false} legendType='none'/>
            </LineChart>
            <span className={Classes.legend}>Durée moyenne des sessions</span>
          </>
        )}
      </div>
    );
}

export default LinearChart;