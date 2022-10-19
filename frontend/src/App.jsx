import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/Form";

import heroImg from './assets/images/hero.png'
import boatImg from './assets/images/boat.png'
import Card from "./components/Card";

const App = () => {

  const [welcomeIsVisible, setWelcomeIsVisible] = useState(false);

  // DATA
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const baseURL = 'http://localhost:5000/api/v1/argonaute/crew';

  useEffect(() =>{
    fetchData();
  },[baseURL, welcomeIsVisible])

  const fetchData = async() => {
    try{
      const results = await axios.get(baseURL)
      setResponse(results.data)
    } catch(err){
      setError(err.message);
  } finally{
      setLoading(false);
  }
  }

  return (
    <div className="App">
      <Header/>
      <main>
        <h2>Ajouter un(e) Argonaute</h2>
        <div className="form-container">
          <div className="form-left">
            <Form welcome={setWelcomeIsVisible}/>
          </div>
          <div className="form-right">
            <img src={heroImg} alt="image representant un hero"/>
            <div className="form-right_welcome" style={welcomeIsVisible? {opacity : 1} : {opacity : 0}}>
              <span>Nouvel Argonaute ajouté, <br/>Bienvenu à bord !</span>
            </div>
          </div>
        </div>
        <div className="form-cardContainer">
          <div className="form-cardContainer_left">
            <img src={boatImg} alt="image representant une galere"/>
          </div>
          <div className="form-cardContainer_right">
            <h2>Membres de l'équipage</h2>
            <div className="crewList">
              {loading ? 
                <span>Chargement..</span>
                : error ?
                  <span>{error}</span> 
                  : response.crew.map( function(el) { return <Card key={el._id} name={el.name} age={el.age} strength ={el.strength} weapon={el.weapon}/>})
              }
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
