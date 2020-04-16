const grpc = require('grpc');

const noteDAL = require('./noteDAL');
const ApiError = require('../../error/ApiError');
const { DELETE_NO_EXISTING_NOTE } = require('../../error/PRE_DEFINED_ERRORS');

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

  return noteDAL.saveNote({
    title,
    content,
  });
};

const removeNoteById = async (id) => {
  const found = await noteDAL.deleteNoteById(id);

  if (!found) {
    throw new ApiError({
      code: grpc.status.NOT_FOUND,
      name: DELETE_NO_EXISTING_NOTE
    });
  }

  return found;
};

module.exports = {
  getNotesByQuery,
  createNote,
  removeNoteById,
};
