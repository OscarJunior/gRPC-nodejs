const { noteService } = require('../notes');

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

module.exports = deleteNoteById;
