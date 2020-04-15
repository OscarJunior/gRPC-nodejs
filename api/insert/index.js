const { noteService } = require('../notes');

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

module.exports = insert;
