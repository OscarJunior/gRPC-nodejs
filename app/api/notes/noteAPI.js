const noteService = require('./noteService');
const { defaultErrorHandler } = require('../../errors');

function list(call, callback) {
  const { query } = call.request;

  noteService.getNotesByQuery(query).then(
    (notes) => {
      callback(null, { notes });
    },
    (err) => {
      defaultErrorHandler(err);
      callback(err, null);
    }
  );
}

function insert(call, callback) {
  const { body } = call.request;

  noteService.createNote(body).then(
    (note) => {
      callback(null, { note });
    },
    (err) => {
      defaultErrorHandler(err);
      callback(err, null);
    }
  );
}

function remove(call, callback) {
  const { id: noteId } = call.request;

  noteService.removeNoteById(noteId).then(
    (note) => {
      callback(null, { note });
    },
    (err) => {
      defaultErrorHandler(err);
      callback(err, null);
    }
  );
}

module.exports = {
  list,
  insert,
  remove,
};
