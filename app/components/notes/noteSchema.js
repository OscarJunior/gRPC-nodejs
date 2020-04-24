const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    content: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
