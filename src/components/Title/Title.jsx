import Classes from './Title.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
/*import { getTitleData } from '../../service/apiGetTitleData';*/
import ApiService from '../../service/apiService';

function Title() {
    const { id } = useParams();
    const [dataUser, setDataUser] = useState();
    const [error, setError] = useState();

    const fetchData = useCallback(async () => {
        try {

            const apiServiceInstance = new ApiService();
            const fetchedUserData  = await apiServiceInstance.getTitleData(`${id}`);

            if (fetchedUserData) {
                setDataUser(fetchedUserData);
            } else {
                setError('data not find...');
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
            {error ? (
                <div>
                    <p>{error}</p>
                </div>
            ) : (
                dataUser && (
                    <>
                        <h1>Bonjour {dataUser.firstName}</h1>
                        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                    </>
                )
            )}
        </div>
    );
}

export default Title;