import React from 'react';
import LOGO from '../../../Logo/DUNAMIS.png';

const DerivShortLogo = () => {
    return (
        <div className='header__menu-left-logo'>
            <a href='https://dunamistraders.com/'>
                <img
                    src={LOGO}
                    alt='Deriv Short Logoo'
                    style={{ height: '25px', width: 'auto' }}
                />
            </a>
        </div>
    );
};

export default DerivShortLogo;