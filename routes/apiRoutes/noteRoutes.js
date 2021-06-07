const router = require("express").Router();
const {
  createNewNote,
  validateNote,
  findById,
  deleteById,
} = require("../../lib/notes");
const { nanoid } = require("nanoid");
const { notes } = require("../../db/db");

router.get("/notes", (req, res) => {
  let results = notes;
  res.json(results);
});

router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post("/notes", (req, res) => {
  req.body.id = nanoid(7);

  if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

router.delete("/notes/:id", (req, res) => {
  const deletedId = req.params.id;
  const noteExists = findById(deletedId, notes);
  if (noteExists) {
    const newNotes = deleteById(deletedId, notes);
    res.json(newNotes);
  } else {
    res.send(404);
  }
});

module.exports = router;
