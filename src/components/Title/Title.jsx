import Classes from './Title.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { normalizeUserDataApi } from '../../service/apiService';

function Title() {
    const { id } = useParams();
    const [dataUser, setDataUser] = useState();

    const fetchData = useCallback(async () => {
        try {
            const fetchedUserData  = await normalizeUserDataApi(`${id}`);

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
        <div className={Classes.title}>
            {dataUser ? (
                <>
                    <h1>Bonjour {dataUser.userInfos.firstName}</h1>
                    <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                </>
            ): null
            }
        </div>
    );
}

export default Title;