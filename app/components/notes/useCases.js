const grpc = require('grpc');

const {
  AppError,
  DELETE_NO_EXISTING_NOTE,
  SKIP_IS_REQUIRED,
  LIMIT_IS_REQUIRED,
} = require('../../utils/errors');
const domain = require('./domain');

const getNotesByQuery = (noteDAL, query) => {
  if (!query.limit) {
    throw new AppError(
      grpc.status.INVALID_ARGUMENT,
      LIMIT_IS_REQUIRED,
      'Check limit argument and try again'
    );
  }

  if (!query.skip) {
    throw new AppError(
      grpc.status.INVALID_ARGUMENT,
      SKIP_IS_REQUIRED,
      'Check skip argument and try again'
    );
  }

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

const createNote = (noteDAL, body) => noteDAL.saveNote(domain.generateNoteBody(body));

const removeNoteById = async (noteDAL, id) => {
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
