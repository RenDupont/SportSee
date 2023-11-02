import Classes from './LinearChart.module.css';
import { 
    LineChart, Line, XAxis,
    Tooltip, Legend, YAxis
} from 'recharts';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { fetchUserAvgSession } from '../../service/getUserAvgSession';

function LinearChart() {

  const { id } = useParams();
  const [userDataAvgSession, setUserDataAvgSession] = useState();

  const fetchData = useCallback(async () => {
        try {
            const fetchedUserData  = await fetchUserAvgSession(id);

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

  const customFormat = (value) => {
    return <span style={{ color: 'black' }}>{value} min</span>;
  };

    return (
      <div className={Classes.linearChart} >
        {userDataAvgSession ? (
          <>
            <LineChart width={258} height={263} data={userDataAvgSession.sessions}>
              <XAxis 
                dataKey="day" tick={{ fill: '#FFFFFF', opacity: '0.5' }} 
                axisLine={false} tickLine={false} tickFormatter={(value) => value} 
              />
              <YAxis domain={[-10, 60]} hide={true} />
              <Tooltip formatter={(value) => customFormat(value)} />
              <Legend />
              <Line type="natural" name='Durée moyenne des sessions' dataKey="sessionLength" stroke="#FFFFFF" dot={false} />
            </LineChart>
          </>
        ) :null}
      </div>
    );
}

export default LinearChart;