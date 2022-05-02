import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
/* import LocalCafeIcon from "@material-ui/icons//LocalCafe"; */

function Profile() {
  let { id } = useParams();
  let history = useHistory();

  const [username, setUsername] = useState("");      //Set authState avec la réponse de basicinfo + Username
  const [photo_profil, setphoto_profil] = useState("");  //Set authState avec la réponse de basicinfo + Photo
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {





    axios
      .get(`https://reves-de-musiques.herokuapp.com/auth/basicinfo/${id}`)
      .then((response) => {
        setUsername(response.data.username);
        setphoto_profil(response.data.photo_profil);
      
      });

    axios
      .get(`https://reves-de-musiques.herokuapp.com/posts/byuserId/${id}`)   //Retourne la liste des post par UserID + Set la clée  ListOfPost avec la liste des posts 
      .then((response) => {
        setListOfPosts(response.data);
     

      });




   
  }, []);




  return (
    <div className="grid">


      <h1> Page de profil public de : {username} </h1>
      <div className="profil">
      <img
          src={"https://reves-de-musiques.herokuapp.com/images/" + photo_profil}
          alt="profil"
        />
      </div>


      <div className="boutonpriv">
        <button
          onClick={() => {
            history.push("/postpriv/" + id);
          }}
        >
        
          Voir la fiche de présentation
        </button>
      </div>
   

    
        <div className="listepostsparutilisateur">

{/* Map de la liste enegistrée dan l'autState avec la clée listOfPosts */}

        {listOfPosts.map((value, key) => {
          return (
      
            <div key={key} className="post3">
              <div className="title"> {value.title} </div>
              <div
                className="body"
                onClick={() => {
                  history.push(`/post/${value.id}`);
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
               
                  src={value.lien}
                
                  allowfullscreen ="true"
                ></iframe>
              
</div>
         <div className="atarget">
<a target="blank" href={value.lien}>
                  {value.lien}
                </a>
             </div>
              <div className="footer">
                <div className="textfooter">
             {/*       {value.createdAt.replace('T', ' à ').slice(0, 18)} */}

           Le  {value.createdAt.toString().replace(/T/g, ' à ').slice(0, 21)}
              
                </div>

     {/*            <div className="buttons">
                  <div className="cofee ">
                    {" "}
                    <ThumbUpAltIcon />
                    <label className="labelcof"> {value.Likes.length}</label>
                  </div>
                </div> */}
              </div>
            </div>  
          );
        })}
      </div></div>
    
  );
}

export default Profile;
