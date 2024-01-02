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

//get notes from server
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    let dbData = JSON.parse(data);
    res.json(dbData);
  });
});

//post new notes to server
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  db.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(db));
  res.json(db);
});

//delete from server when pressing delete
app.delete("/api/notes/:id", (req, res) => {
  const newDb = db.filter((note) => note.id !== req.params.id);
  fs.writeFileSync("./db/db.json", JSON.stringify(newDb));
  readFile.json(newDb);
});

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