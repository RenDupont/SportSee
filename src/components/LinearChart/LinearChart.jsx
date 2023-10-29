import Classes from './LinearChart.module.css';
import { 
    LineChart, Line, XAxis,
    Tooltip, Legend
} from 'recharts';

function LinearChart({data}) {

  const customFormat = (value) => {
    return <span style={{ color: 'black' }}>{value} min</span>;
  };

  return (
    <div className={Classes.linearChart} >
      <LineChart width={258} height={263} data={data.sessions}>
        <XAxis 
          dataKey="day" tick={{ fill: '#FFFFFF', opacity: '0.5' }} 
          axisLine={false} tickLine={false} tickFormatter={(value) => value} 
        />
        <Tooltip formatter={(value) => customFormat(value)} />
        <Legend />
        <Line type="monotone" name='Durée moyenne des sessions' dataKey="sessionLength" stroke="#FFFFFF" dot={false} />
      </LineChart>
    </div>
  );
}

export default LinearChart;