// Dependencies & Express Data Parsing
const fs = require('fs');
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5001;
// const { notes } = require("./db/db.json");
// console.log("notes = ", notes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Unique ID
// const uniqueId = require('generate-unique-id');
const { v4: uuidv4 } = require('uuid');

//Create New Note
function createANewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify( notesArray, null, 2)
    );
    return note;
  };

//Get Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    
  res.sendFile((path.join(__dirname, "./db/db.json")));
});

//Post Route
app.post('/api/notes', (req, res) => {
  req.body.id = uuidv4();
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  console.log("notes = ", notes);
  const note = createANewNote(req.body, notes);
  res.json(note);
});
    
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
  
    const remNote = notes.findIndex(note => note.id ==id);
  
    notes.splice(remNote, 1);
    return res.send();
  });

  //Listen on port 5001
app.listen(PORT, () => {
    console.log(`App waiting on PORT ${PORT}`);
  });
 