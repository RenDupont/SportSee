import Classes from './ColumnChart.module.css'
import { 
    BarChart, Bar, XAxis,
    YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer 
} from "recharts";

function ColumnChart({data}) {

    let maxKilo = 0;
    let minKilo = 0;

    if (data) {
        data.sessions.forEach( it => {
            maxKilo = Math.max(maxKilo, it.kilogram);
            minKilo = Math.min(minKilo, it.kilogram);
        });
    }

    return (
        <div className={Classes.columnChart}>
            {data ? (
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={data.sessions}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis dataKey='kilogram' domain={[0, ((maxKilo / 10) *10) + 10]} orientation='right'/>
                        <Tooltip />
                        <Legend wrapperStyle={{ bottom: 295, left: 260}} />
                        <Bar dataKey="kilogram" name="Poids (kg)" fill="#282D30" barSize={10} shape={"round"} />
                        <Bar dataKey="calories" name="Calories brûlées (kCal)" fill="#E60000" barSize={10} shape={"round"} />
                    </BarChart>
                </ResponsiveContainer>
            ) : null}
        </div>
    );
}

export default ColumnChart;