/* import "./App.css"; */

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Home from "./pages/Home";
import Priv from "./pages/Priv";
import CreatePost from "./pages/CreatePost";
import Createpostpriv from "./pages/CreatePostpriv";
import Post from "./pages/Post";
import Post2 from "./pages/Post2";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Delete from "./pages/Delete";
import Accueil from "./pages/Accueil";
import Recherche from "./pages/Recherche";
import Postpriv from "./pages/Postpriv";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
  /*   email: "", */
    id: 0,
    photo_profil: "",
    prof: "",
    status: false,
  });

  useEffect(() => {
    axios
      .get("https://reves-de-musiques.herokuapp.com/auth/auth", {
        //backend : auth(app)/auth(route)
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });



        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            photo_profil: response.data.photo_profil,
           /*  email: response.data.email, */
            prof: response.data.prof,
            status: true,
          });
        }
      });
  }, [] );

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ /* email: "", */ username: "", prof: "", id: 0, status: false });
  };

  return (
    <div className="ajust">
      <AuthContext.Provider value={{authState, setAuthState }}>
        <Router>
          
        
              {/*     <h1>
                <Link to={`/profile/${authState.id}`}>
                  {authState.username}
                </Link>
              </h1> */}
           
             
            
            
            {/*         <div className="principal">

            {(authState.username === username || authState.admin === true) && (
          <>
            <button
              onClick={() => {
                history.push("#");
              }}
            >
              {" "}
              Changer mon mots de passe
            </button>

          </>
        )}
      </div> */}
         
              <div className="barredenavigation">  
              
              
              <div className="apparitionbarrecontexte">
<ul>  <li id="button" className="bouton">{authState.status && (
                <button onClick={logout}>⚪ Déconnexion</button>
              )}</li>








<li id="username" className="username">   {!authState.prof && authState.username && (



                  <Link to={`/postpriv/${authState.id}`}>
                    {authState.username}
                  </Link>




                )}
                
                
                {authState.prof && (
                  <Link to={`/profile/${authState.id}`}>
                    {authState.username}
                  </Link>
                )}
                
                
                </li>



<li className="fil" >{authState.status && <Link to="/Home"> ✨Fils d'actualités</Link>}</li>



<li className="creerprive">   {authState.status && (
                  <Link to="/createpostpriv">🎶 Créer un Post Privé</Link>
                )}</li>

<li className="priv" >{authState.status && (
                  <Link to={`/postpriv/${authState.id}`}>
                    🎼Mes Posts Privés
                  </Link>
                )}</li>















            
           
          
          <li id="postpublic" className="public">   {authState.prof && (
                  <Link to="/createpost"> 🎵Créer un Post Public</Link>
                )}
           </li>
              </ul>  
        {/*     <div className="deco">
              {authState.status && (
                <button onClick={logout}>⚪Déconnexion</button>
              )}
            </div>  
             */}
            </div>


            {console.log("console log de authState")}
{console.log(authState)}
{console.log("console log de authState.status")}
{console.log(authState.status)}


            {!authState.status && (
              <>
                {" "}
              
             <ul>

             <li><Link to="/registration">💎 S'enregistrer</Link></li>  
                 <li> <Link to="/login"> ☀️Connexion</Link></li>
               
                
                 
              
                  
                  <li><Link to="/Accueil">🏛 Accueil</Link></li>  
                  </ul> 
              </>  
            )} 
             
        </div> 
          <Switch>
           
            <Route path="/priv" exact component={Priv} />
          


{/* Vers la page d'un post ---------------------------------------------------------------------------------------------------------individuel section Public*/}


            <Route path="/post/:id" exact component={Post} /> {/*   Page du post individuelle public  */}



            <Route path="/profile/:id" exact component={Profile} />
            <Route path="/createpost" exact component={CreatePost} />

{/* Vers la page d'un poste individuel section Personelle */}

            <Route path="/postsecondaire/:id" exact component={Post2} />   {/*   Page du post individuelle privé */}

            <Route path="/postpriv/:id" exact component={Postpriv} />
            <Route path="/changepassword" exact component={ChangePassword} />
            <Route path="/createpostpriv" exact component={Createpostpriv} />
{/* Login et enregisrement utilisateur  */}
            <Route path="/registration" exact component={Registration} />
            <Route path="/login" exact component={Login} />
 
            <Route path="/Accueil" exact component={Accueil} />
            <Route path="/Home" exact component={Home} />
            <Route path="/" exact component={Accueil} />


         
            <Route path="/delete" exact component={Delete} />
           
            <Route path="/recherche2" exact component={Recherche} />
       

            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>  
      </div>
     );
}  

export default App;
