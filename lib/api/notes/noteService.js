const grpc = require('grpc');
const noteDAL = require('./noteDAL');

const getNotesByQuery = (query, populates) => {
  const result = noteDAL.findNotesByQuery(query);

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
    content,
  });
};

const removeNoteById = async (id) => {
  const found = await noteDAL.findNoteById(id);

  if (!found) {
    throw {
      code: grpc.status.NOT_FOUND,
      message: 'NOTE WAS NOT FOUND, CHECK ID REQUEST AND RETRY AGAIN',
    };
  }

  const { _id } = found;

  return noteDAL.deleteNoteById(_id);
};

module.exports = {
  getNotesByQuery,
  createNote,
  removeNoteById,
};
