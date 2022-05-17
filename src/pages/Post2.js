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

function Post2() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  let history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/postspriv/byId2/${id}`)
      .then((response) => {
        setPostObject(response.data);           /*  Set l'authState avec un post choisit par ID */
      });

    axios
      .get(`http://localhost:3001/comments2/${id}`)
      .then((response) => {
        setComments(response.data);
      });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments2",
        {
          commentBody: newComment,
          Posts2Id: id,
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
      .delete(`http://localhost:3001/comments2/${id}`, {
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
      .delete(`http://localhost:3001/postspriv/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        history.push("/Home");
      });
  };

  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Entrer un nouveau titre:", "Mon nouveau titre ");
      if (newTitle  === null) {
        return;
    }
      axios.put(
        "http://localhost:3001/postspriv/title",
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
        "http://localhost:3001/postspriv/postText",
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
              <a target="blank" href={postObject.lien}>
                {postObject.lien}
              </a>
            </div>
          </div>

          <div className="footer">
            {postObject.username}  le  {postObject.createdAt}

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
                rows="8"
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

export default Post2;
