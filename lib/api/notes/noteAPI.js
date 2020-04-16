const noteService = require('./noteService');
const handleError = require('../../error/handler');

function list(_, callback) {
  const defaultQuery = {};
  const defaultPopulates = [];

  noteService.getNotesByQuery(defaultQuery, defaultPopulates).then(
    (notes) => {
      callback(null, { notes });
    },
    (err) => {
      handleError(err);
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
      handleError(err);
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
      handleError(err);
      callback(err, null);
    }
  );
}

module.exports = {
  list,
  insert,
  remove,
};
