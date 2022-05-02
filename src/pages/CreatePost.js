import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

function CreatePost() {
  let history = useHistory();
  const initialValues = {
    title: "",
    postText: "",
    lien: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Vous devez entrer un titre"),
    postText: Yup.string()
      .min(4)
      .max(60000)
      .required("Vous devez entrer du texte"),
    lien: Yup.string()
      .notRequired("Vous pouvez poster sans insérer de lien")
      .matches(
        /((https?):\/\/)?()/,   /*  /((https?):\/\/)?(www.)/, */
        "Entrer une URL correcte sous cette forme : https://www. !"
      ),
  });

  const onSubmit = (data) => {
    axios
      .post("https://reves-de-musiques.herokuapp.com/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        history.push("/Home");
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <div className="POSTPUBLIC">Créer un post <span> PUBLIC</span></div>
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            cols="45"
            rows="4"
            component="textarea"
            autoComplete="off"
            id="postText"
            name="postText"
            placeholder="(Ex. Post...)"
            type="text"
          />{" "}
          <label>Noter ici votre lien: </label>
          <ErrorMessage name="lien" component="span" />
          <Field
            autoComplete="off"
            id="lien"
            name="lien"
            placeholder="(Ex. htpp://monlien.com...)"
          />
          <button type="submit"> Créer un Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
