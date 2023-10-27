import Classes from './LinearChart.module.css';
import { 
    LineChart, Line, XAxis,
    Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

function LinearChart({data}) {

  const customFormat = (value) => {
    return <span style={{ color: 'black' }}>{value} min</span>;
  };

  return (
    <ResponsiveContainer width="33%" height={263}>
      <LineChart data={data.sessions} style={{ backgroundColor: "#FF0000" }}>
        <XAxis 
          dataKey="day" tick={{ fill: '#FFFFFF', opacity: '0.5' }} 
          axisLine={false} tickLine={false} tickFormatter={(value) => value} 
        />
        <Tooltip formatter={(value) => customFormat(value)} />
        <Legend />
        <Line type="monotone" dataKey="sessionLength" stroke="#FFFFFF" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LinearChart;