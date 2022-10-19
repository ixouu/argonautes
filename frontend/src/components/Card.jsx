import React from 'react';

const Card = ({ name, age, strength, weapon}) => {
    return (
        <article>
            <h4>{name}</h4>
            <button className='article-button'> <i class="fa-solid fa-circle-info"></i></button>
        </article>
    );
}

export default Card;
