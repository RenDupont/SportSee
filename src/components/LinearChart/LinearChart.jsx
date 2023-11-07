import Classes from './LinearChart.module.css';
import { 
    LineChart, Line, XAxis,
    Tooltip, Legend, YAxis
} from 'recharts';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { normalizeUserDataApi } from '../../service/apiService';

function LinearChart() {

  const { id } = useParams();
  const [userDataAvgSession, setUserDataAvgSession] = useState();

  const fetchData = useCallback(async () => {
        try {
            const fetchedUserData  = await normalizeUserDataApi(`${id}/average-sessions`);

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

  const customFormat = (value, name) => {
    return (
      <div>
          <span style={{display: 'none'}}>{name}</span>
          <span style={{ color: 'black' }}>{value} min</span>
      </div>
    );
  };

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
              <YAxis domain={[-10, 60]} hide={true} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="natural" stroke='#FFFFFF' dataKey="sessionLength" dot={false}/>
            </LineChart>
          </>
        )}
      </div>
    );
}

export default LinearChart;