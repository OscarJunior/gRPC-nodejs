const noteDAL = require('./noteDAL');

const getByQuery = (query, populates) => {
  const result = noteDAL.findNotes(query);

  if (!populates.length) {
    return result;
  }

  return populates.reduce((acc, populate) => acc.populate(populate), result);
};

const createNote = (body) => {
  const title = body.title || 'MY TITLE';
  const content = body.content || 'MY CONTENT';

  noteDAL.saveNote({
    title,
    content
  });
};

const deleteNote = (id) => noteDAL.deleteNoteById(id);

module.exports = {
  getByQuery,
  createNote,
  deleteNote,
};
