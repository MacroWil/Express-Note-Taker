const fs = require("fs");
const express = require("express");
const PORT = process.env.PORT || 3001;
const path = require("path");
const app = express();
const db = require("./db/db.json");
//unique id generator for posts
const { v4: uuidv4 } = require("uuid");

//connect files and folders
app.use(express.static("public"));
app.use(express.json());

// routing
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`App listening on ${PORT}`));
