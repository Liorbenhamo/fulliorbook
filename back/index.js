const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Users = require("./models/Users");
const posts = require("./models/posts");
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
mongoose
  .connect(
    "mongodb+srv://liorbenhamo:0502730029@cluster0.hzf3enx.mongodb.net/facebook?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB is Connected"))
  .catch((error) => {
    console.log("Connection Failed");
    console.log(error);
  });

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    let data = await Users.find();
    res.send(data);
  } catch (err) {
    res.status(400).json(err.message);
  }
});
app.post("/users", async (req, res) => {
  try {
    console.log(req);
    console.log(req.body);
    const { email, username, password, firstname, lastname, userimgurl } =
      req.body;
    const newUser = new Users({
      username,
      password,
      firstname,
      email,
      lastname,
      userimgurl,
    });
    const userAdded = await newUser.save();
    res.status(200).json(userAdded);
  } catch (err) {
    res.status(400).json(err.message);
  }
});
app.put("/put", async (req, res) => {
  try {
    let doc = await Users.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).json(doc);
  } catch (err) {
    console.log("atlist");
    res.status(400).json(err.message);
  }
});
app.get("/posts", async (req, res) => {
  try {
    let data = await posts.find().populate("username");
    res.send(data);
  } catch (err) {
    res.status(400).json(err.message);
  }
});
app.patch("/post", async (req, res) => {
  try {
    // console.log(req.body._id);
    console.log(req.body);
    let doc = await posts.findByIdAndUpdate(req.body._id, req.body);
    console.log("hello");
    res.status(200).json(doc);
  } catch (err) {
    console.log("atlist");
    res.status(400).json(err.message);
  }
});

app.post("/posts", async (req, res) => {
  try {
    console.log(req.body);
    const { username, likes, comment, imgurl } = req.body;
    const newPost = new posts({
      username,
      likes,
      comment,
      imgurl,
    });
    const postAdded = await newPost.save();
    res.status(200).json(postAdded);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
