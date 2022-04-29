
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Accueil from "./Accueil";
import Registration from "./Registration";
import Login from "./Login";
import PageNotFound from "./PageNotFound";

import { AuthContext } from "../helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function Nav() {
  const [authState, setAuthState] = useState({
    username: "",
    email: "",
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
            email: response.data.email,
            prof: response.data.prof,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ email: "", username: "", prof: "", id: 0, status: false });
  };

  return (
    <div className="nav">
  <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="flex3">
            <div className="usernameaccueil">
              {/*     <h1>
                <Link to={`/profile/${authState.id}`}>
                  {authState.username}
                </Link>
              </h1> */}
              <h1>

              <div className="deco">
              {authState.status && (
                <button onClick={logout}>⚪Déconnexion</button>
              )}
            </div>
                {authState.prof && (
                  <Link to={`/profile/${authState.id}`}>
                    {authState.username}
                  </Link>
                )}{" "}
              </h1>{" "}
            </div>{" "}
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
            <div className="principal">
              <div className="primary">
                {authState.prof && (
                  <Link to="/createpost"> 🎵Créer un Post Public</Link>
                )}
              </div>
              <div className="primary">
                {authState.status && <Link to="/"> ✨Fils d'actualités</Link>}
              </div>{" "}
              <div className="primary">
                {authState.status && (
                  <Link to="/createpostpriv">🎶 Créer un Post Privé</Link>
                )}
              </div>
              <div className="primary">
                {authState.status && (
                  <Link to={`/postpriv/${authState.id}`}>
                    🎼Mes Posts Privés
                  </Link>
                )}
              </div>
            </div>
           
            {!authState.status && (
              <>
                {" "}
                <div className="">
                  {" "}
                  <Link to="/login"> Connexion</Link>{" "}
                </div>
                <div className="">
                  {" "}
                  <Link to="/registration"> S'enregistrer</Link>{" "}
                </div>
              </>
            )}
          </div>{" "}
         
          <Switch>
          <Route path="/Accueil" exact component={Accueil} />
           
            <Route path="/registration" exact component={Registration} />
            <Route path="/login" exact component={Login} />
           

           
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default Nav