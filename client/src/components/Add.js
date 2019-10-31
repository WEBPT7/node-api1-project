import React, { useState } from "react";

const Add = props => {
  const [newUser, setNewUser] = useState({
    name: "",
    bio: ""
  });

  function handleChanges(e) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        props.addUser(newUser);
      }}
    >
      <input type="text" name="name" onChange={handleChanges} />
      <input type="text" name="bio" onChange={handleChanges} />
      <button>Newenize</button>
    </form>
  );
};

export default Add;
