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
 





  return (
    <div className="containerpost">  


 
      {listOfPosts.map((value, key) => {

const date = new Date(value.createdAt);
        //Map argument de tableau
        return (
     
        
          <div  key={key}  className="post">


           
            <div className="title"   onClick={() => {
                history.push(`/post/${value.id}`);
              }}> {value.title} </div>
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
               scrolling="yes"
               frameBorder="10"
               overflow="hidden"
               height="50%"
               width="50%" 
                  src={value.lien}
                  allowfullscreen ="true"
                 
                ></iframe>
              
           
              
              </div>
        {/*       <div className="atarget">
              <a target="blank" href={value.lien}>
                {value.lien}
              </a> </div> */}
            <div>
         
           </div> </div> 
              
            
            

            <div className="footer">
                <Link to={`/profile/${value.UserId}`}>
                <span >
                  Créé par  {value.username}</span> <br></br> <span className="date">
                  {new Intl.DateTimeFormat('local').format(date)} </span> 
                </Link>
          <div className="ThumbUpAltIcon">
                <ThumbUpAltIcon
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                  className={
                    likedPosts.includes(value.id) ? "delike" : "like"
                  }
                />
                <label className="white"> {value.Likes.length}</label>
           
            </div>  </div> </div> 
         
        );
      })}
    </div> 
  );
}

export default Home;
