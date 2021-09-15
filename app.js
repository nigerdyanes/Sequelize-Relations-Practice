const express = require("express");
const { sequelize, User, Post, Contact, Tag } = require("./models");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hola Mundo.");
});

app.get("/list-users", async (req, res) => {
  const users = await User.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: ["posts"],
  });
  res.json(users);
});

app.get("/list-posts", async (req, res) => {
  const posts = await Post.findAll({
    include: [
      {
        as: "user",
        model: User,
      },
      {
        as: "tags",
        model:Tag
      }
    ],
  });
  res.json(posts);
});

app.post("/create-user", async (req, res) => {
  const { username } = req.body;
  await User.create({
    username,
  });
  res.sendStatus(201);
});

app.post("/create-post", async (req, res) => {
  const { userId, title, content } = req.body;
  await Post.create({
    userId,
    title,
    content,
  });
  res.sendStatus(201);
});

app.get("/list-contacts", async (req, res) => {
  const contacts = await Contact.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        as: "username",
        model: User,
        attributes: {
          exclude: ["createdAt", "updatedAt", "contactId"],
        },
      },
    ],
  });
  res.json(contacts);
});

app.listen(4000, () => {
  console.log("Servidor iniciado");
  sequelize.authenticate().then(() => {
    console.log("Se ha establecido la conexión");
  });
});
