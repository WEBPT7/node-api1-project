// implement your API here
const express = require("express");
const db = require("./data/db.js");
const server = express();
server.use(express.json());
server.get("/", (req, res) => {
  res.send("Hello World");
});

//Get all users
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .send(error)
        .res.status(500)
        .json({ message: "error getting users" });
    });
});
// server.get("/hubs", (req, res) => {
//   db.find()
//     .then(hubs => {
//       res.status(201).json(hubs);
//     })
//     .catch(err => {
//       res.status(201).json({
//         message: err,
//         success: false
//       });
//     });
// });

//Get users by Id
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "This ID does not exist." });
      }
      res.send(user);
    })
    .catch(error => {
      res.send(error);
    });
});

//Add a Users
server.post("/api/users", (req, res) => {
  const usersData = req.body;
  if (!usersData.name || !usersData.bio) {
    res.status(400).json({ message: "a user needs a name" });
  } else {
    db.insert(usersData)
      .then(users => {
        res.json(users);
      })
      .catch(error => {
        res.json({ message: "There was a error adding a user" });
      });
  }
});

//Update a Users
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db.update(id, changes)
    .then(user => {
      if (changes.name === null || changes.bio === null) {
        res.status(400).json({ message: "A person must have a name and Bio" });
      } else if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "This ID does not exist.." });
      }

      res.json(user);
    })
    .catch(error => {
      res.json({ message: "There was a error Updating a user" });
    });
});

//Delete a users
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "This ID does not exist." });
      }
    })
    .catch(error => {
      res.json({ message: "There was a error removing a user" });
    });
});

const port = 8000;
server.listen(port, () =>
  console.log("\nApi Server is Up and Running on port \n")
);
