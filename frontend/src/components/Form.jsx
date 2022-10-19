import React, {useState} from 'react';
import axios from 'axios';

const Form = ({ welcome}) => {

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
            setInputAge(parseInt(age));
        }
    }

    // Strength 
    const [inputStrength, setInputStrength] = useState(1);

    const handleStrength = (strength) => {
        setInputStrength(parseInt(strength));
    }

    // Weapon
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


    // handle submit
    const [areValidInputs, setAreValidInputs] = useState(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!isValidName || !isValidAge || !isValidWeapon){
            setAreValidInputs(false);
            setNameIsEditing(true);
            setAgeIsEditing(true);
            setWeaponIsEditing(true);
            return;
        }else{
            setAreValidInputs(true);
        }
        if (areValidInputs){
            const data = {
                name : inputName,
                age: inputAge,
                strength : inputStrength,
                weapon : inputWeapon
            }
            sendData(data)
        }
    }
    // Send data
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const baseURL = 'http://localhost:5000/api/v1/argonaute/add'

    const sendData = async(data) => {
        console.log(typeof inputAge)
        setLoading(true)
        try{
            const results = await axios.post(baseURL, data);
            setResponse(results.data);
            welcome(true);
            const timer = setTimeout(() =>{
                welcome(false)
            }, 5000)
            setInputAge(18);
            setInputName('');
            setInputWeapon(options[0].value);
            return() => clearTimeout(timer);
        } catch(err){
            if (err.response !== undefined){
                setError(err.response.data.message)
            }else {
                setError(err.message)
            }
        } finally{
            setLoading(false)
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
                value={inputName}
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
                value={inputAge}
                onChange={(e) => checkAgeValidity(e.target.value)}
                onClick= {() => setAgeIsEditing(true)}
                style={!ageIsEditing ? {border: "3px solid transparent"} : !isValidAge?{ border: "3px solid rgb(197, 23, 23)" } : { border : "3px solid rgb(16, 118, 16)"}}
                />
            <span className='newHeroAge-warning'style={!isValidAge && ageIsEditing ? { opacity: 1 } : { opacity: 0 }}>Un héro doit avoir entre 18 et 70 ans.</span>
            {/* Strength */}
            <label htmlFor='newHeroStrength'>Force : </label>
            <p>
                <span className='strength-details'style={{ backgroundColor : "#8C031C"}}>Faible</span>
                <span className='strength-details'style={{ backgroundColor : "#E85627"}}>Moyenne</span>
                <span className='strength-details'style={{ backgroundColor : "#FF7A29"}}>Elevée</span>
                <span className='strength-details'style={{ backgroundColor : "#30700D"}}>Héroïque</span>
                <span className='strength-details'style={{ backgroundColor : "#BF8211"}}>Légendaire</span>
            </p>
            <input 
                type="range" 
                min="1" max="5"
                defaultValue={inputStrength}
                value={inputStrength}
                id='newHeroStrength'
                onChange={(e) => handleStrength(e.target.value)}
            />
            {/* Weapon */}
            <label htmlFor='newHeroWeapons'>Arme utilisée:</label>
                <select 
                value={inputWeapon}
                defaultValue={inputWeapon}
                onChange={handleWeaponChoice}
                name="newHeroWeapons" 
                id="newHeroWeapons"
                style={!weaponIsEditing ? {border: "3px solid transparent"} : !isValidWeapon? { border : "3px solid rgb(197, 23, 23)" } : { border : "3px solid rgb(16, 118, 16)"}}
                >
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.text}</option>
                ))}
                </select>

            <button onClick={(e) => handleSubmit(e)}>{loading? 'Chargement...' : 'Ajouter'}</button>
            {!areValidInputs && <span className='newHeroForm-warning'>Veuillez remplir tous les champs du formulaire.</span>}
            {error && <span className='newHeroForm-warning'>Erreur : {error}.</span>}
        </form>
    );
}

export default Form;
