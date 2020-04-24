const useCases = require('./useCases');
const noteDAL = require('./noteDAL');

function list(call) {
  const { query } = call.request;

  if (!query.conditions) {
    query.conditions = {};
  }

  if (!query.sorter) {
    query.sorter = '';
  }

  return useCases.getNotesByQuery(noteDAL, query).then((notes) => ({ notes }));
}

function insert(call) {
  const { body } = call.request;

  return useCases.createNote(noteDAL, body).then((note) => ({ note }));
}

function remove(call) {
  const { id: noteId } = call.request;

  return useCases.removeNoteById(noteDAL, noteId).then((note) => ({ note }));
}

module.exports = {
  list,
  insert,
  remove,
};
