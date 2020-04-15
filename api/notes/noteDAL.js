const Note = require('./noteSchema');

const findNotes = (query) => Note.find(query);

const saveNote = (body) => {
  const note = new Note(body);

  return note.save();
};

const deleteNoteById = (id) => Note.findByIdAndDelete(id);

module.exports = {
  findNotes,
  saveNote,
  deleteNoteById,
};
