const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  externalReferenceId: {
    type: String,
    required: true,
  },
  taskList: [
    {
      actionName: {
        type: String,
        required: true,
      },
      locationId: {
        type: String,
        required: true,
      },
      _id: false,
    },
  ],
  jobStatus: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Job", jobSchema);
