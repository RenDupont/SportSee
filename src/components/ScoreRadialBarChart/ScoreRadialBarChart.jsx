import { RadialBarChart, RadialBar, Legend, Text } from 'recharts';
import Classes from './ScoreRadialBarChart.module.css';

function RadialBarChartExample({ data }) {

    const percentageScore = data.score * 100;
    const score = [
        {fill:'#FF0000', name: 'Score', value: percentageScore },
        {fill:'#FFFFFF', name: 'Empty', value: 100 - percentageScore },
    ];

    const style = {
        top: '20%',
        left: '15px',
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
        color:'#20253A',
    };

    return (
        <div className={Classes.scoreRadialBarChart}>
            <RadialBarChart width={258} height={263} innerRadius={80} outerRadius={109} barSize={10} startAngle={200} endAngle={-200} data={score}>
                <RadialBar background clockWise={true} dataKey="value" cornerRadius={3} />
                <Legend iconSize={0} layout="vertical" verticalAlign="top" align="left" wrapperStyle={style}/>
            </RadialBarChart>
            <p className={Classes.objectif}>{percentageScore}% de votre objectif</p>
        </div>
    );
}

export default RadialBarChartExample;