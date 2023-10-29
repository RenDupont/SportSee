import { Radar, RadarChart, PolarGrid,  
    PolarAngleAxis } from 'recharts'; 
import Classes from './RadarChartActivity.module.css';


function RadarChartActivity({data}) {

    const kindData = data.kind;

    let dataPoints = Object.keys(kindData).map((category) => ({
        name: category,
        value: kindData[category],
    }));

    dataPoints = dataPoints.reverse();

    return (
        <div className={Classes.radarChart}>
            <RadarChart width={258} height={263} cx="50%" cy="50%" outerRadius="70%" data={dataPoints} >
                <PolarGrid radialLines={false} />
                <PolarAngleAxis dataKey="name" tick={{ fill: 'white' }} />
                <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
            </RadarChart>
        </div>
    );
}

export default RadarChartActivity;