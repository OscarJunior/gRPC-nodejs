const Note = require('../../config/database/noteSchema');

const findNotesByQuery = (query) => {
  const projection = null;
  const { conditions, options, sorter } = query;

  return Note.find(conditions, projection, options).sort(sorter);
};

const findNoteById = (id) => Note.findById(id);

const saveNote = (body) => new Note(body).save();

const deleteNoteById = (id) => Note.findByIdAndDelete({ _id: id });

module.exports = {
  findNotesByQuery,
  saveNote,
  deleteNoteById,
  findNoteById,
};
