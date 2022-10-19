import React from 'react';
import ReactDOM from 'react-dom';

import swordImg from '../assets/images/sword.png';
import shiledImg from '../assets/images/shield.png';
import spearImg from '../assets/images/spear.png';
import bowImg from '../assets/images/bow.png';
import soldierImg from '../assets/images/soldier.png'
const Modal = ({ name, age, strength, weapon, open, onClose }) => {

    if (!open) return null;
    const displayStrength = () => {
        switch (strength) {
            case 1:
                return <span className='hero-modal_strength' style={{ backgroundColor : "#8C031C"}}>Faible</span>
            case 2:
                return <span className='hero-modal_strength' style={{ backgroundColor : "#E85627"}}>Moyenne</span>
            case 3: 
                return <span className='hero-modal_strength' style={{ backgroundColor : "#FF7A29"}}>Elevée</span>
            case 4: 
                return <span className='hero-modal_strength' style={{ backgroundColor : "#30700D"}}>Héroïque</span>
            case 5:
                return <span className='hero-modal_strength' style={{ backgroundColor : "#BF8211"}}>Légendaire</span>
            default:
                return null
        }
    }
    
    const displayWeapon = () => {
        switch (weapon) {
            case "sword":
                return <img src={swordImg} alt= "illustration d'une épée"/>
            case "shiled":
                return <img src={shiledImg} alt="illustration d'un bouclier"/>
            case "spear":
                return <img src={spearImg} alt="illustration d'une lance"/>
            case "bow":
                return <img src={bowImg} alt="illustration d'un arc"/>
            case "unkown":
                return <span>Arme non définie.</span>
            default:
            return null
        }
    }

    return ReactDOM.createPortal(
        <>
            <div className='overlay' onClick={onClose}></div>
            <div className='hero-modal'>
                <button className="hero-modal_close" onClick={onClose}>&times;</button>
                <h1> {name}</h1>
                <span>Age : {age} ans</span>
                <span>Force : {displayStrength()}</span>
                <span>Arme sélectionnée :</span>
                {displayWeapon()}
                <img className='solider-img' src={soldierImg} alt="illustration d'un arc"/>
            </div>
        </>,
        document.getElementById('modal-root')
    );
}

export default Modal;
