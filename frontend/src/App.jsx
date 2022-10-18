import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/Form";

import heroImg from './assets/images/hero.png'

const App = () => {
  return (
    <div className="App">
      <Header/>
      <main>
        <h2>Ajouter un(e) Argonaute</h2>
        <div className="form-container">
          <div className="form-left">
            <Form/>
          </div>
          <div className="form-right">
            <img src={heroImg} alt="image representant un hero"/>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
