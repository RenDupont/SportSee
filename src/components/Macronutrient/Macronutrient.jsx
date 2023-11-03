import Classes from './Macronutrient.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { fetchUserData } from '../../service/getUserData';
import calorie from '../../assets/calories-icon.png';
import protein from '../../assets/protein-icon.png';
import carb from '../../assets/carbs-icon.png';
import fat from '../../assets/fat-icon.png';

function Macronutrient() {
    const { id } = useParams();
    const [dataUser, setDataUser] = useState();

    const fetchData = useCallback(async () => {
        try {
            const fetchedUserData  = await fetchUserData(id);

            if (fetchedUserData) {
                setDataUser(fetchedUserData);
            } else {
                console.log("Utilisateur non trouvé.");
            }

        } catch (error) {
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className={Classes.allMacronutrient}>
            {dataUser ? (
                <>
                    <div className={Classes.macronutrient}>
                        <img src={calorie} alt='Calories' />
                        <div>
                            <h1>{dataUser.keyData.calorieCount + 'kCal'}</h1>
                            <h2>Calories</h2>
                        </div>
                    </div>
                    <div className={Classes.macronutrient}>
                        <img src={protein} alt='Proteines' />
                        <div>
                            <h1>{dataUser.keyData.proteinCount + 'g'}</h1>
                            <h2>Proteines</h2>
                        </div>
                    </div>
                    <div className={Classes.macronutrient}>
                        <img src={carb} alt='Glucides' />
                        <div>
                            <h1>{dataUser.keyData.carbohydrateCount + 'g'}</h1>
                            <h2>Glucides</h2>
                        </div>
                    </div>
                    <div className={Classes.macronutrient}>
                        <img src={fat} alt='Lipides' />
                        <div>
                            <h1>{dataUser.keyData.lipidCount + 'g'}</h1>
                            <h2>Lipides</h2>
                        </div>
                    </div>
                </>
            ) :null}
        </div>
    );
}

export default Macronutrient;