const Job = require("../models/job.model");

module.exports = (io, socket) => {
  const createJob = async (data) => {
    var job = new Job({
      externalReferenceId: data.externalReferenceId,
      taskList: data.taskList,
      jobStatus: data.jobStatus,
    });
    await Job.create(job, (err, message) => {
      if (err) {
        console.log(err);
      } else {
        console.log(message);
      }
    });
  };

  const updateJob = async (data) => {
    data.messageType = "JobUpdate";
    const { locationId, actionName } = data.lastCompletedTask;
    // find the job with the externalReferenceId and remove last completed task from taskList
    await Job.findOneAndUpdate(
        { externalReferenceId: data.externalReferenceId },
        { $pull: { taskList: { locationId, actionName} } },
    );
    io.emit("JobUpdate", data);
  };

  return {
    createJob,
    updateJob,
  };
};
