const fs = require("fs");
const path = require("path");

//Create a New Note
function createNewNote(body, notes) {
  const note = body;
  notes.push(note);

  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify({ notes }, null, 2)
  );
  return note;
}

//Validate the Note Contents
function validateNote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || note.text !== "string") {
    return false;
  }
  return true;
}

//Find the note by ID
function findById(id, notes) {
  const result = notes.filter(note => note.id === id)[0];
  return result;
}

module.exports = {
  createNewNote,
  validateNote,
  findById,
};
