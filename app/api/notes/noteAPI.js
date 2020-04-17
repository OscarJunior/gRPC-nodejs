const noteService = require('./noteService');
const { defaultErrorHandler } = require('../../errors');

function list(call, callback) {
  const defaultQuery = call.request;

  noteService.getNotesByQuery(defaultQuery).then(
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
  const newNoteBody = call.request;

  noteService.createNote(newNoteBody).then(
    (createdNote) => {
      callback(null, createdNote);
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
    (deletedNote) => {
      callback(null, deletedNote);
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
