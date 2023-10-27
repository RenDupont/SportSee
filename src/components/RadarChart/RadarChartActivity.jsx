import { Radar, RadarChart, PolarGrid,  
    PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'; 
import Classes from './RadarChartActivity.module.css';


function RadarChartActivity({data}) {

    const kindData = data.kind;

    const dataPoints = Object.keys(kindData).map((category) => ({
        name: category,
        value: kindData[category],
    }));

    return (
        <ResponsiveContainer className={Classes.radarChart} width="35%" height={263}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataPoints} >
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
            </RadarChart>
        </ResponsiveContainer>
    );
}

export default RadarChartActivity;