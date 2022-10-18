import React, {useState} from 'react';

const Form = () => {

    // Name
    const [inputName, setInputName] = useState('');
    const [isValidName, setIsValidName] = useState(false);
    const nameRegExp = new RegExp('(^[a-zA-Zéè -]{2,35}$)');
    const [nameIsEditing, setNameIsEditing] = useState(false);

    const checkNameValidity = (e) => {
        let inputValue = e.target.value
        setInputName(inputValue);
        if (inputValue.length < 3 || !nameRegExp.test(inputValue)){
            setIsValidName(false);
        } else{
            setIsValidName(true);
        }
    }

    // Age
    const [inputAge, setInputAge] = useState(18);
    const [isValidAge, setIsValidAge] = useState(true);
    const [ageIsEditing, setAgeIsEditing] = useState(false);

    const checkAgeValidity = (age) => {
        if( age< 18 || age > 70){
            setIsValidAge(false)
        } else{
            setIsValidAge(true);
            setInputAge(age);
        }
    }

    const [inputStrength, setInputStrength] = useState(1);
    const [inputWeapon, setInputWeapon] = useState('unkown');


    // Send form
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form>
            {/* Name */}
            <label htmlFor='newHeroName' className='label-1'>Nom de l'argonaute : </label>
            <input 
                type="text" 
                placeholder='Charalampos' 
                id='newHeroName'
                defaultValue={inputName}
                onChange={(e) => checkNameValidity(e)}
                onClick={() => setNameIsEditing(true)}
                style={!isValidName && nameIsEditing ?{ border: "3px solid rgb(197, 23, 23)" } : { border : "3px solid rgb(16, 118, 16)"}}
            />
            <span className='newHeroName-warning'style={!isValidName && nameIsEditing ?{ opacity: 1 } : { opacity: 0 }}>Veuillez entrez un nom correct svp (ex: Hercules)</span>
            {/* Age */}
            <label htmlFor='newHeroAge'>Age : </label>
            <input 
                type="number" 
                placeholder='18' 
                min="18" max="70" 
                id='newHeroAge'
                defaultValue={inputAge}
                onChange={(e) => checkAgeValidity(e.target.value)}
                onClick= {() => setAgeIsEditing(true)}
                style={!isValidAge && ageIsEditing ?{ border: "3px solid rgb(197, 23, 23)" } : { border : "3px solid rgb(16, 118, 16)"}}
                />
            <span className='newHeroAge-warning'style={!isValidAge && ageIsEditing ? { opacity: 1 } : { opacity: 0 }}>Un héro doit avoir entre 18 et 70 ans.</span>
            {/* Strength */}
            <label htmlFor='newHeroStrength'>Force : </label>
            <input 
                type="range" 
                min="1" max="5"
                defaultValue={inputStrength}
                id='newHeroStrength'
                onChange={(e) => setInputStrength(e.target.value)}
                />
            {/* Weapons */}
            <label htmlFor='newHeroWeapons'>Armes utilisées :</label>
                <select name="newHeroWeapons" id="newHeroWeapons">
                    <option value="sword">Epée</option>
                    <option value="shiled">Bouclier</option>
                    <option value="spear">Lance</option>
                    <option value="bow">Arc</option>
                    <option value="unkown" selected>Non communiqué</option>
                </select>

            <button onClick={(e) => handleSubmit(e)}>Ajouter</button>
        </form>
    );
}

export default Form;
