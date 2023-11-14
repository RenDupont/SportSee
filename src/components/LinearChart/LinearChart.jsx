import Classes from './LinearChart.module.css';
import { 
    LineChart, Line, XAxis,
    Tooltip, Legend, YAxis
} from 'recharts';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
/*import { getLinearChartData } from '../../service/apiGetLinearChartData';*/
import ApiService from '../../service/apiService';


function LinearChart() {

  const { id } = useParams();
  const [userDataAvgSession, setUserDataAvgSession] = useState();
  const [error, setError] = useState();

  const fetchData = useCallback(async () => {
        try {
          const apiServiceInstance = new ApiService();
          const fetchedUserData  = await apiServiceInstance.getLinearChartData(`${id}/average-sessions`);

            if (fetchedUserData) {
              setUserDataAvgSession(fetchedUserData);
            } else {
              setError("data not find...");
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
        {error ? (
          <div className={Classes.errorMessage}>
            <p>{error}</p>
          </div>
        ) : (
          userDataAvgSession && (
            <>
              <LineChart width={240} height={263} data={userDataAvgSession.sessions}>
                <XAxis 
                  dataKey="day" tick={{ fill: '#FFFFFF', opacity: '0.5' }} 
                  axisLine={false} tickLine={false} tickFormatter={(value) => value}
                  allowDataOverflow={true}
                />
                <YAxis domain={[-10, 100]} hide={true} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="natural" strokeWidth={2} stroke='#FFFFFF' dataKey="sessionLength" dot={false} legendType='none' />
              </LineChart>
              <span className={Classes.legend}>Durée moyenne des sessions</span>
            </>
          )
        )}
      </div>
    );
}

export default LinearChart;