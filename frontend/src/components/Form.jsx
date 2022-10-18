import React, {useState} from 'react';

const Form = () => {


    // Name
    const [inputName, setInputName] = useState('');
    const [isValidName, setIsValidName] = useState(null);
    const nameRegExp = new RegExp('(^[a-zA-Zéè -]{2,35}$)');
    const [nameIsEditing, setNameIsEditing] = useState(false);

    const checkNameValidity = (e) => {
        let inputValue = e.target.value
        setInputName(inputValue);
        if ((inputValue.length < 3 || !nameRegExp.test(inputValue)) && nameIsEditing){
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

    // Strength 
    const [inputStrength, setInputStrength] = useState(1);

    const handleStrength = (strength) => {
        setInputStrength(strength);
    }

    // Weapons
    const options = [
        {value: '', text:'Choisissez une arme'},
        {value: 'sword', text:'Epée'},
        {value: 'shiled', text:'Bouclier'},
        {value: 'spear', text:'Lance'},
        {value: 'bow', text:'Arc'},
        {value: 'unkown', text:'Non communiqué'}
    ]

    const [inputWeapon, setInputWeapon] = useState(options[0].value);
    const [isValidWeapon, setIsValidWeapon] =useState(false);
    const [weaponIsEditing, setWeaponIsEditing] = useState(false);
    const handleWeaponChoice = e => {
        setInputWeapon(e.target.value);
        setIsValidWeapon(true);
        setWeaponIsEditing(true)
        if (e.target.value === ""){
            setIsValidWeapon(false);
        }
    }


    // Send form
    const [areValidInputs, setAreValidInputs] = useState(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!isValidName || isValidAge || isValidWeapon){
            setAreValidInputs(false)
        }else{
            setAreValidInputs(true)
        }
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
                style={!nameIsEditing? {border: "3px solid transparent"} : !isValidName ?{ border: "3px solid rgb(197, 23, 23)" } : { border : "3px solid rgb(16, 118, 16)"}}
            />
            <span className='newHeroName-warning'style={!nameIsEditing? {opacity : 0} : !isValidName ? { opacity: 1 } : { opacity: 0 }}>Veuillez entrez un nom correct (ex: Hercules).</span>
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
                style={!ageIsEditing ? {border: "3px solid transparent"} : !isValidAge?{ border: "3px solid rgb(197, 23, 23)" } : { border : "3px solid rgb(16, 118, 16)"}}
                />
            <span className='newHeroAge-warning'style={!isValidAge && ageIsEditing ? { opacity: 1 } : { opacity: 0 }}>Un héro doit avoir entre 18 et 70 ans.</span>
            {/* Strength */}
            <label htmlFor='newHeroStrength'>Force : </label>
            <input 
                type="range" 
                min="1" max="5"
                defaultValue={inputStrength}
                id='newHeroStrength'
                onChange={(e) => handleStrength(e.target.value)}
            />
            {/* Weapons */}
            <label htmlFor='newHeroWeapons'>Armes utilisées :</label>
                <select 
                value={inputWeapon}
                onChange={handleWeaponChoice}
                name="newHeroWeapons" 
                id="newHeroWeapons"
                style={!weaponIsEditing ? {border: "3px solid transparent"} : !isValidWeapon? { border : "3px solid rgb(197, 23, 23)" } : { border : "3px solid rgb(16, 118, 16)"}}
                >
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.text}</option>
                ))}
                </select>

            <button onClick={(e) => handleSubmit(e)}>Ajouter</button>
        </form>
    );
}

export default Form;
