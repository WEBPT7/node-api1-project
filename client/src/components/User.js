import React, { useState } from "react";

const User = props => {
  const { id, name, bio } = props.users;
  const [editing, setEditing] = useState(false);

  const [editedUser, setEditedUser] = useState({ name, bio, id });

  function handleChanges(e) {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  }

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          props.updateUser(editedUser);
          setEditing(!editing);
        }}
      >
        {editing ? (
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChanges}
          />
        ) : (
          <h1>{name}</h1>
        )}
        {editing ? (
          <input
            type="text"
            name="bio"
            value={editedUser.bio}
            onChange={handleChanges}
          />
        ) : (
          <h3>{bio}</h3>
        )}
        <button style={{ display: editing ? "block" : "none" }}>
          Updatenate
        </button>
      </form>

      <button
        onClick={() => {
          props.delUser(id);
          setEditing(!editing);
        }}
        style={{ display: editing ? "block" : "none" }}
      >
        Removenateinator
      </button>
      <button
        onClick={() => setEditing(!editing)}
        style={{ display: editing ? "none" : "block" }}
      >
        Edify
      </button>
    </>
  );
};

export default User;
