import Classes from './Dashboard.module.css';
import Header from '../Header/Header';
import SideNavBar from '../SideNavBar/SideNavBar';
import Title from '../Title/Title';
import ColumnChart from '../ColumnChart/ColumnChart';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserData } from '../../service/apiService';
import calorie from '../../assets/calories-icon.png';
import protein from '../../assets/protein-icon.png';
import carb from '../../assets/carbs-icon.png';
import fat from '../../assets/fat-icon.png';
import Macronutrient from '../Macronutrient/Macronutrient';
import LinearChart from '../LinearChart/LinearChart';
import RadarChartActivity from '../RadarChart/RadarChartActivity';
import ScoreRadialBarChart from '../ScoreRadialBarChart/ScoreRadialBarChart';

function Dashboard() {
    const { id } = useParams();
    const [userData, setUserData] = useState();
    const [userDataActivity, setUserDataActivity] = useState();
    const [userDataAvgSession, setUserDataAvgSession] = useState();
    const [userDataPerformance, setUserDataPerformance] = useState();

    const fetchData = useCallback(async () => {
        try {
            const userData = await fetchUserData(id);

            if (userData.userData) {
                setUserData(userData.userData);
            } else {
                console.log("Utilisateur non trouvé.");
            }

            if (userData.userActivity) {
                setUserDataActivity(userData.userActivity);
            } else {
                console.log("Données d'activité introuvables.");
            }

            if (userData.userAverageSession) {
                setUserDataAvgSession(userData.userAverageSession);
            } else {
                console.log("Données de session introuvables.");
            }

            if (userData.userPerformance) {
                setUserDataPerformance(userData.userPerformance);
            } else {
                console.log("Données de performance introuvables.");
            }
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className={Classes.dashboard}>
            <Header />
            <section>
                <SideNavBar />
                <div className={Classes.dashboardContent}>
                    {userData ? (
                            <>
                                <Title data={userData} />
                                <main className={Classes.monitoring}>
                                    <div className={Classes.graph}>
                                        <ColumnChart data={userDataActivity} />
                                        <div>
                                            <LinearChart data={userDataAvgSession} />
                                            <RadarChartActivity data={userDataPerformance} />
                                            <ScoreRadialBarChart data={userData} />
                                        </div>
                                    </div>
                                    <div className={Classes.allMacronutrient}>
                                        <Macronutrient img={calorie} value={userData.keyData.calorieCount + 'kCal'} type="Calories" />
                                        <Macronutrient img={protein} value={userData.keyData.proteinCount + 'g'} type="Proteines" />
                                        <Macronutrient img={carb} value={userData.keyData.carbohydrateCount + 'g'} type="Glucides" />
                                        <Macronutrient img={fat} value={userData.keyData.lipidCount + 'g'} type="Lipides" />
                                    </div>
                                </main>
                            </>
                    ) : null }
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
