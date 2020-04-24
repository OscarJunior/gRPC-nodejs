const { defaultErrorHandler } = require('../../../utils/errors');

function generateReponse(fn, call, callback) {
  fn(call).then(
    (body) => {
      callback(null, body);
    },
    (err) => {
      defaultErrorHandler(err);
      callback(err, null);
    }
  );
}

module.exports = generateReponse;
