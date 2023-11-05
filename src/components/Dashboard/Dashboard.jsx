import Classes from './Dashboard.module.css';
import Header from '../Header/Header';
import SideNavBar from '../SideNavBar/SideNavBar';
import Title from '../Title/Title';
import ColumnChart from '../ColumnChart/ColumnChart';
import Macronutrient from '../Macronutrient/Macronutrient';
import LinearChart from '../LinearChart/LinearChart';
import RadarChartActivity from '../RadarChart/RadarChartActivity';
import ScoreRadialBarChart from '../ScoreRadialBarChart/ScoreRadialBarChart';

function Dashboard() {

    return (
        <div className={Classes.dashboard}>
            <Header />
            <section>
                <SideNavBar />
                <div className={Classes.dashboardContent}>
                    <Title />
                    <main className={Classes.monitoring}>
                        <div className={Classes.graph}>
                            <ColumnChart />
                            <div>
                                <LinearChart />
                                <RadarChartActivity />
                                <ScoreRadialBarChart />
                            </div>
                        </div>
                        <Macronutrient />
                    </main>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;


//inverser la liste des type de performance 
//modifier linearCHart pour qu'il corresponde à la maquette
//changer les légendes des chart pour correspondre à la maquette
//faire le responsive
//middleware ?