import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";



function Postpriv() {
  let { id } = useParams();
  let history = useHistory();
  const [username, setUsername2] = useState("");
  const [photo_profil, setphoto_profil] = useState("");
  const [listOfPosts, setListOfPosts2] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`https://reves-de-musiques.herokuapp.com/auth/postpriv/${id}`)
      .then((response) => {
        setUsername2(response.data.username);
        setphoto_profil(response.data.photo_profil);
      });

    axios
      .get(`https://reves-de-musiques.herokuapp.com/posts/byuserIdpriv/${id}`)
      .then((response) => {
        setListOfPosts2(response.data);
      });
  }, []);
/*   const mode2 = () => {
    window.location.reload(false);
  }; */

  return (
    <div className="grid">
      <h1> Fiche de : {username} </h1>
      <div className="profil">
        <img
         
          src={"https://reves-de-musiques.herokuapp.com/images/" + photo_profil}
          alt="photo_profil"
        />
      </div>
    
        {/*    <button
        onClick={() => {
          history.push("/createpostpriv");
        }}
      >
        {" "}
        créer Publication privées
      </button> */}

        <div className="boutonpriv">
          {" "}
          {(authState.username === username || authState.admin === true) && (
            <>
                 <button className=""
                onClick={() => {
                  history.push("#");
                }}
              >
                {" "}
                Changer mon mots de passe
              </button> 

              {/*   <form
                action={"https://reves-de-piano.herokuapp.com/upload/" + id}
                method="POST"
                enctype="multipart/form-data"
              >
                <div class="form-group">
                  <input
                    type="file"
                    name="file"
                    id="input-files"
                    class="form-control-file border"
                  />
                </div>

                <button type="submit" class="btn btn-primary">
                  Soumêtre l'image
                </button>
              </form> */}

              {/*  <button
                onClick={() => {
                  history.push("/delete");
                }}
              >
                {" "}
                Supprimer le compte
              </button> */}
            </>
          )}
        </div>
      
      <div className="listepostsparutilisateur">
        {listOfPosts.map((value, key) => {
          return (
      
            <div key={key} className="post3">
              <div className="title"onClick={() => {
                  history.push(`/postsecondaire/${value.id}`);
                }}> {value.title} </div>
              <div
                className="body"
                onClick={() => {
                  history.push(`/postsecondaire/${value.id}`);
                }}
              >
                {value.postText}
              </div>
            <div className="iframdiv">
                <iframe id="imglien" className="lien"
                    loading="lazy"
               scrolling="no"
               frameborder="10"
               overflow="hidden"
               height="100%"
               width="100%" 
                  src={value.lien}
                
                  allowFullScreen ="true"
                ></iframe>
              
</div>
         <div className="atarget">
<a target="blank" href={value.lien}>
                  {value.lien}
                </a>
             </div>
              <div className="footer">
                <div className="textfooter">
            

            Le {value.createdAt.replace('T', ' à ').slice(0, 21)}
              
                </div>

              
              </div>
            </div>  
          );
        })}
      </div></div>
  );
}

export default Postpriv;
