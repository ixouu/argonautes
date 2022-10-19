import React,{useState} from 'react';
import Modal from './Modal';

const Card = ({ name, age, strength, weapon}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        !modalIsOpen? setModalIsOpen(true) : setModalIsOpen(false)
    }

    return (
        <>
            <article onClick={openModal}>
                <h4>{name}</h4>
                <button className='article-button'> <i className="fa-solid fa-circle-info"></i></button>
            </article>
            {modalIsOpen && <Modal name={name} age={age} strength={strength} weapon={weapon} open={modalIsOpen} onClose={() => setModalIsOpen(false)}/>}
        </>
    );
}

export default Card;
