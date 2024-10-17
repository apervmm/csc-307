import express from "express";
import cors from "cors";

const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());


const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

app.get("/", (req, res) => {
    res.send("Hello, World!");
});


const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
};

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => (name === undefined || user["name"] === name && user["job"] === job)
);
};

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job == undefined){
      let result = findUserByName(name);
      result = { users_list: result };
      res.status(200).send(result);
    } else if (name != undefined || job != undefined) {
      let result = findUserByNameAndJob(name, job);
      result = { users_list: result };
      res.status(200).send(result);
    } else {
      res.status(200).send(users);
    }
});


const findUserById = (id) =>{
  users["users_list"].find((user) => user["id"] === id);
}

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const generateId = () => {
  return Math.floor(Math.random() * 1000000)
}


const addUser = (user) => {
  user.id = generateId()
  users["users_list"].push(user);
  return user;
}

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const added = addUser(userToAdd);
  res.status(201).json({ message: "User added", user: added})
});


const deleteUser = (id) => {
  const idx = users["users_list"].findIndex(user => user["id"] === id);
  if (idx !== -1) {
    const deleted = users["users_list"].splice(idx, 1);
    return deleted[0];
  }
  return undefined;
}

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const deletedUser = deleteUser(userId);

  if (deletedUser !== undefined ) {
    res.status(204).json({ message: "User deleted", user: deletedUser });
  } else {
    res.status(404).json({ message: 'resource not found'});
  }
});



app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});