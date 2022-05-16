
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import image from "../logos/favicon.jpg";
import Nav from "./Nav";

import ReactPlayer from 'react-player'
import { AuthContext } from "../helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import Registration from "./Registration";

function Acuueil() {
  const [authState, setAuthState] = useState({
    username: "",
    email: "",
    id: 0,
    photo_profil: "",
    prof: "",
    status: false,
  });

  useEffect(() => {
   }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ email: "", username: "", prof: "", id: 0, status: false });
  };

  return (
    <>
   
   <div className="accueil">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          

            
          
            <img src={ image} /> 
                   <div className="presentationtitre">Bienvenue  </div> <br></br>
                  <div className="presentation">  <div className="arriereplanpres">   <span className="transparent">
                    Bonjour à tous,  😊<br></br> 
                    Ce site à pour vocation de parler des sujet de l'interpretation des rêves  🎹 <br></br> 

           
        Il vous permet de vous inscrire eet de noter des rêves ainsi que de disposer d'outils d'interpretations. <br></br>
         Voici un lien didacticiel pour vous faire la main : <a href="/"> LE DIDACTICIEL </a>
        
       
        
        </span>

       </div>
                  
<br></br>
                  <div className="">Les trois derniers s

        
                
                  </div> 
        
                  </div>
          <Switch>
     

          <Route path="/login" exact component={Login} />
            <Route path="/registration" exact component={Registration} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div> </>
  );
}

export default Acuueil