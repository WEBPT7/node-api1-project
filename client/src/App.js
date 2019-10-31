import axios from "axios";
import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";
import "./App.css";
import Users from "./components/Users";
// import { axize } from "./utils";

function App(props) {
  const [list, setList] = useState([]);

  const submitUser = users => {
    axios
      .post("http://localhost:5000/api/login", users)
      .then(rez => {
        localStorage.setItem("token", rez.data.payload);
        props.history.push("/users");
      })
      .catch(rez => console.error(rez));
  };

  const grabUsers = _ => {
    axios()
      .get("http://localhost:8000/api/users")
      .then(res => console.log("res", res.data))
      .catch(err => console.error(err));
  };

  const addUser = users => {
    axios()
      .post("http://localhost:8000/api/users", users)
      .then(rez => setList(rez.data))
      .catch(err => console.error(err));
  };

  const updateUser = users => {
    axios()
      .put(`http://localhost:8000/api/users/${users.id}`, users)
      .then(res => setList(res.data))
      .catch(err => console.error(err));
  };

  const delUser = id => {
    axios()
      .delete(`http://localhost:8000/api/users/${id}`)
      .then(rez => setList(rez.data))
      .catch(err => console.error(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fake Auth</h1>

        {/* <Switch>
          <Route
            exact
            path="/"
            render={props => <Login {...props} submitUser={submitUser} />}
          /> */}

        <Route
          path="/api/users"
          render={props => (
            <Users
              {...props}
              grabUsers={grabUsers}
              addUser={addUser}
              updateUser={updateUser}
              delUser={delUser}
              list={list}
            />
          )}
        />
        {/* </Switch> */}
      </header>
    </div>
  );
}

export default withRouter(App);
