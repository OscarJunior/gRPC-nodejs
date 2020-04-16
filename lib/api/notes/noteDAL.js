const Note = require('./noteSchema');

const findNotesByQuery = (query) => Note.find(query);

const findNoteById = (id) => Note.findById(id);

const saveNote = (body) => {
  const note = new Note(body);

  return note.save();
};

const deleteNoteById = (id) => Note.findByIdAndDelete({ _id: id });

module.exports = {
  findNotesByQuery,
  saveNote,
  deleteNoteById,
  findNoteById
};
