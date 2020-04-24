const grpc = require('grpc');

const {
  AppError,
  DELETE_NO_EXISTING_NOTE,
  LIMIT_IS_REQUIRED,
} = require('../../utils/errors');
const domain = require('./domain');

const getNotesByQuery = (noteDAL, query) => {
  if (query.resultPerPage === 0) {
    throw new AppError(
      grpc.status.INVALID_ARGUMENT,
      LIMIT_IS_REQUIRED,
      'The resultPerPage argument can not be zero'
    );
  }

  const options = {
    limit: query.resultPerPage,
    skip: query.pageNumber,
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
      'Check noteId argument and try it again'
    );
  }

  return found;
};

module.exports = {
  getNotesByQuery,
  createNote,
  removeNoteById,
};
