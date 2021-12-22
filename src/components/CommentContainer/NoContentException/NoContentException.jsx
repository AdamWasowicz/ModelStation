import React from 'react';


//Styles
import { default as CC_NoContentException } from './NoContentException.module.scss';


const NoContentException = () => {

    return(
        <div className='NoContentException'>
            <div className='Information'>Ten Post nie ma żadnych komentarzy</div>
            <div className='Description'>Bądź pierwszym który jakiś doda</div>
        </div>
    )
}


export default NoContentException;