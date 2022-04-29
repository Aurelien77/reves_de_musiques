import axios from "axios";
import { useHistory } from "react-router-dom";
import React, { useEffect, useContext } from "react";

import { AuthContext } from "../helpers/AuthContext";

const logout = () => {
  localStorage.removeItem("accessToken");
};

function Delete() {
  let history = useHistory();

  const { authState } = useContext(AuthContext);

  useEffect((id) => {
    axios
      .delete(`https://reves-de-musiques.herokuapp.com/delete/${authState.id}`)

      .then(() => {
        localStorage.removeItem("accessToken");

        logout();
        history.push("/login");
        window.location.reload(false);
      });
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          {
            Delete();
          }
        }}
      >
        Suppprimer le compte ?
      </button>
    </div>
  );
}

export default Delete;
