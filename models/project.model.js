import mongoose from 'mongoose';
import { StepSchema } from './step.model';
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  trunkUrl: {
    type: String,
    required: true
  },
  steps: [StepSchema]
});

export const Project = mongoose.model('Project', ProjectSchema);

export function getProjects(callback) {
  Project.find(callback);
}

export function getProjectById(id, callback) {
  Project.findById(id, callback);
}

export function addProject(project, callback) {
  console.log("new", project);
  Project.create(project, callback);
}

export function updateProject(id, project, callback) {
  project._id = new ObjectId(id);
  var query = { _id: project._id };
  Project.updateOne(query, project, callback);
}

export function deleteProject(id, callback) {
  var query = { _id: new ObjectId(id) };
  Project.deleteOne(query, callback);
}
