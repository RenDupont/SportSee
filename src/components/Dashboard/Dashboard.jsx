import Classes from './Dashboard.module.css';
import Header from '../Header/Header';
import SideNavBar from '../SideNavBar/SideNavBar';
import Title from '../Title/Title';
import ColumnChart from '../ColumnChart/ColumnChart';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import calorie from '../../assets/calories-icon.png';
import protein from '../../assets/protein-icon.png';
import carb from '../../assets/carbs-icon.png';
import fat from '../../assets/fat-icon.png';
import Macronutrient from '../Macronutrient/Macronutrient';
import LinearChart from '../LinearChart/LinearChart';

function Dashboard() {
    const { id } = useParams();
    const [userData, setUserData] = useState();
    const [userDataActivity, setUserDataActivity] = useState();
    const [userDataAvgSession, setUserDataAvgSession] = useState();

    const fetchData = useCallback(async () => {
        try {
            const userDataResponse = await axios.get('../../mock/userData.json');
            const userActivityResponse = await axios.get('../../mock/userActivity.json');
            const userAvgSessionResponse = await axios.get('../../mock/userAverageSession.json');

            const userData = userDataResponse.data.find(user => user.id === parseInt(id, 10));
            const userActivity = userActivityResponse.data.find(user => user.userId === parseInt(id, 10));
            const userAverageSession = userAvgSessionResponse.data.find(user => user.userId === parseInt(id, 10));

            if (userData) {
                setUserData(userData);
            } else {
                console.log("Utilisateur non trouvé.");
            }

            if (userActivity) {
                setUserDataActivity(userActivity);
            } else {
                console.log("Données d'activité introuvables.");
            }

            if (userAverageSession) {
                setUserDataAvgSession(userAverageSession);
            } else {
                console.log("Données de session introuvables.");
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
