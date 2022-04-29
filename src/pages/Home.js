import React from "react";
import axios from "axios";
 import "../css/style.css";  
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import "bootstrap/dist/css/bootstrap.min.css";



function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);


  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("https://reves-de-musiques.herokuapp.com/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
       
        
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              //Map argument de tableau
              return like.PostId;
            })
          );
        });
    }
  }, []);

 
  const likeAPost = (postId) => {
    axios
      .post(
        "https://reves-de-musiques.herokuapp.com/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            //Map argument de tableau
            if (post.id === postId) {




              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });   
  };
 

  const d1 = new Date();

  if (typeof d1 === 'object' && d1 !== null && 'toLocaleDateString' in d1) {
    const result = d1.toLocaleDateString('fr-FR');
    console.log(result); // 👉️ 12/16/...
  }
  




  return (
    <div className="containerpost">  


 
      {listOfPosts.map((value, key) => {

       
        //Map argument de tableau
        return (
     
        
          <div  key={key}  className="post">


           
            <div className="title"> {value.title} </div>
            <div
              className="body"
              onClick={() => {
                history.push(`/post/${value.id}`);
              }}
            >
              {value.postText}
            

            <div className="iframdiv">
            <iframe  className="lien"
             loading="lazy"
               scrolling="no"
               frameBorder="10"
               overflow="hidden"
               height="50%"
               width="50%" 
                  src={value.lien}
              
                 
                ></iframe>
              
           
              
              </div>
              <div className="atarget">
              <a target="blank" href={value.lien}>
                {value.lien}
              </a> </div>
            <div>
         
           </div> </div> 
              
            
            

            <div className="footer">
                <Link to={`/profile/${value.UserId}`}>
                
                  Créé par <div className="pseudo"> {value.username}   </div>
                  <span className="date" > {value.createdAt.toString().replace(/T/g, ' à ').slice(0, 21)}</span>
                </Link>
          
                <ThumbUpAltIcon
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                  className={
                    likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                  }
                />
                <label className="white"> {value.Likes.length}</label>
           
            </div>  </div> 
         
        );
      })}
    </div> 
  );
}

export default Home;
