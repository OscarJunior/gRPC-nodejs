const grpc = require('grpc');

const noteDAL = require('./noteDAL');
const { AppError, DELETE_NO_EXISTING_NOTE } = require('../../utils/errors');

const getNotesByQuery = (query) => {
  const options = {
    limit: query.limit,
    skip: query.skip,
  };

  return noteDAL.findNotesByQuery({
    options,
    conditions: query.conditions,
    sorter: query.sorter,
  });
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
    throw new AppError(
      grpc.status.INVALID_ARGUMENT,
      DELETE_NO_EXISTING_NOTE,
      'Check NoteId argument and try it again'
    );
  }

  return found;
};

module.exports = {
  getNotesByQuery,
  createNote,
  removeNoteById,
};
