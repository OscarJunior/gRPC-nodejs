const useCases = require('./useCases');
const DAL = require('./DAL');

function list(call) {
  const { query } = call.request;

  if (!query.conditions) {
    query.conditions = {};
  }

  if (!query.sorter) {
    query.sorter = '';
  }

  return useCases.getNotesByQuery(DAL, query).then((notes) => ({ notes }));
}

function insert(call) {
  const { body } = call.request;

  return useCases.createNote(DAL, body).then((note) => ({ note }));
}

function remove(call) {
  const { id: noteId } = call.request;

  return useCases.removeNoteById(DAL, noteId).then((note) => ({ note }));
}

module.exports = {
  list,
  insert,
  remove,
};
