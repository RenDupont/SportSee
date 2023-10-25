import Classes from './Title.module.css';
import React from 'react';

function Title({data}) {
    
    return (
        <div className={Classes.title}>
            {data ? (
                <>
                    <h1>Bonjour {data.userInfos.firstName}</h1>
                    <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                </>
            ): null
            }
        </div>
    );
}

export default Title;