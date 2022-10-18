import React from 'react';
import WildSchoolLogo from '../assets/images/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png'

const Header = () => {
    return (
        <header>
            <img src={WildSchoolLogo} alt='Logo de la Wild School'/>
            <h1>Les Argonautes </h1>
        </header>
    );
}

export default Header;
