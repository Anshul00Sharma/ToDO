// Importing mongoose
const mongoose = require("mongoose");

// setting up sechema
const notesSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  createdOn: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});
const Notes = mongoose.model("Notes", notesSchema);

// exporting mongoose
module.exports = Notes;
