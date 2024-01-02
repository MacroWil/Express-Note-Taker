const fs = require("fs");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

//connect files and folders
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routing
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//post new notes to server
app.post("/api/notes", (req, res) => {
  let db = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newNote = req.body;
  let noteLength = db.length.toString();
  newNote.id = noteLength;

  db.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(db));
  res.json(db);
});

//delete from server when pressing delete
app.delete("/api/notes/:id", (req, res) => {
  let db = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newDb = db.filter((note) => {
    return note.id !== req.params.id;
  });
  fs.writeFileSync("./db/db.json", JSON.stringify(newDb));
  res.json(newDb);
});

app.listen(PORT, () => console.log(`App listening on ${PORT}`));
