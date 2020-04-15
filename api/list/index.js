const { noteService } = require('../notes');

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

module.exports = list;
