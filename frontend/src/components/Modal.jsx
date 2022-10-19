import React from 'react';
import ReactDOM from 'react-dom';;

const Modal = ({ name, age, strength, weapon, open, onClose }) => {

    if (!open) return null;

    const displayStrength = () => {
        
    }

    return ReactDOM.createPortal(
        <>
            <div className='overlay' onClick={onClose}></div>
            <div className='hero-modal'>
                <button className="hero-modal_close" onClick={onClose}>&times;</button>
                <h1> {name}</h1>
                <span>Age : {age} ans</span>
                <span>Force : {displayStrength}</span>
            </div>
        </>,
        document.getElementById('modal-root')
    );
}

export default Modal;
