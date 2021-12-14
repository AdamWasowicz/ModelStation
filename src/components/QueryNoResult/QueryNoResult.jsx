import React from 'react';


//Styles
import { default as QueryNoResultStyle } from './QueryNoResult.module.scss'


const QueryNoResult = () => {

    return (
        <div className='QueryNoResult'>
            <div className='Information'>Brak postów do wyświetlenia</div>

            <div className='Description'>
                Nie znaleziono żadnych postów spełniających parametry wyszukiwania, spróbuj innych parametrów.
            </div>
        </div>
    )
};

export default QueryNoResult;