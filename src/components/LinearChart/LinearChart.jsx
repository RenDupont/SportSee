import Classes from './LinearChart.module.css';
import { 
    LineChart, Line, XAxis,
    YAxis, CartesianGrid, Tooltip, 
    Legend, ResponsiveContainer 
} from 'recharts';

function LinearChart({data}) {
    return (
        <ResponsiveContainer width="25%" height={263}>
          <LineChart data={data.sessions}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sessionLength" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      );
}

export default LinearChart;