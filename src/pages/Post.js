import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  commentaire: Yup.string().required("Vous devez entrer un titre"),
  postText: Yup.string()
    .min(8)
    .max(60000)
    .required("Vous devez entrer du texte"),
  lien: Yup.string().notRequired("Vous pouvez poster sans insérer de lien"),
});
const initialValues = {
  commentaire: "",
};

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  let history = useHistory();

  useEffect(() => {
    axios
      .get(`https://reves-de-musiques.herokuapp.com/posts/byId/${id}`)
      .then((response) => {
        setPostObject(response.data);
      });

    axios
      .get(`https://reves-de-musiques.herokuapp.com/comments/${id}`)
      .then((response) => {
        setComments(response.data);
      });
  }, []);

  const addComment = () => {
    axios
      .post(
        "https://reves-de-musiques.herokuapp.com/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`https://reves-de-musiques.herokuapp.com/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`https://reves-de-musiques.herokuapp.com/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        history.push("/Home");
      });
  };

  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Entrer un nouveau titre:", "Mon nouveau titre " );
      if (newTitle  === null) {
        return;
    }
      
      axios.put(
        "https://reves-de-musiques.herokuapp.com/posts/title",
        {
          newTitle: newTitle,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );

      setPostObject({ ...postObject, title: newTitle });
    } else {
      let newPostText = prompt("Entrer un nouveau texte:", "Mon nouveau texte " );
      if (newPostText  === null) {
        return;
    }
      axios.put(
        "https://reves-de-musiques.herokuapp.com/posts/postText",
        {
          newText: newPostText,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );

      setPostObject({ ...postObject, postText: newPostText });
    }
  };
  
  return (
    <div className="indivi">
      
<div className="post2">
          <div  className="title"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("title");
              }
            }}
          >
            {postObject.title}
          </div>
          <div className="body"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("body");
              }
            }}
          >
            {postObject.postText}

            <div className="lien">
              <iframe
                height="500px"
                width="100%"
                src={postObject.lien}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
           {/*    <a target="blank" href={postObject.lien}>
                {postObject.lien}
              </a> */}
            </div>
          </div>

          <div className="footer">
            {postObject.username}  le  {new Intl.DateTimeFormat('local').format(postObject.createAt)}
           

            {(authState.username === postObject.username ||
              authState.admin === true) && (
              <button
                onClick={() => {
                  deletePost(postObject.id);
                }}
              >
                {" "}
                Supprimer le Post
              </button>
            )}
          </div>
        
      </div>


      
     
        <div className="addCommentContainer">
          <Formik
            initialValues={initialValues}
            onClic={addComment}
            validationSchema={validationSchema}
          >
            <Form className="formcommentaire" id="commentaire">
              <label></label>
              {/*    <ErrorMessage name="commentaire" component="span" /> */}

              <Field
                component="textarea"
                rows="3"
                cols="45"
                autocomplete="off"
                id="comment"
                name="commentaire"
                placeholder="(Ex. Très sympa !...)"
                value={newComment}
                onChange={(event) => {
                  setNewComment(event.target.value);
                }}
              />
              <button className="boutoncommentaire" onClick={addComment}>
                {" "}
                Ajouter un commentaire
              </button>
            </Form>
          </Formik>
        </div>

        
        <div className="listOfComments">
          {comments.map((comment, key) => {
            //Map argument de tableau
            return (



              <div key={key} className="comment">
                {comment.commentBody}

                <label className="white"> Posté par {comment.username}</label>
                {(authState.username === comment.username ||
                  authState.admin === true) && (
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    Suppprimer X
                  </button>
                )}
              </div>



            );
          })
          
          }
        </div></div>

    
  );
}

export default Post;
