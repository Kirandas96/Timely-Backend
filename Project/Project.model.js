const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    "projectName": String,
    "client": String,
    "singColor": String,
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true }
});

const ProjectModel = mongoose.model("project", projectSchema);

module.exports = ProjectModel;  