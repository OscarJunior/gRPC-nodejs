const noteService = require('./noteService');

function list(_, callback) {
  const defaultQuery = {};
  const defaultPopulates = [];

  noteService.getByQuery(defaultQuery, defaultPopulates).then(
    (notes) => {
      callback(null, { notes });
    },
    (err) => {
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
    (e) => {
      callback(e, null);
    }
  );
}

function deleteNoteById(call, callback) {
  const { id: noteId } = call.request;

  noteService.deleteNote(noteId).then(
    (deletedNote) => {
      callback(null, deletedNote);
    },
    (err) => {
      callback(err, null);
    }
  );
}

module.exports = {
  list,
  insert,
  deleteNoteById,
};
