import mongoose from 'mongoose';
import { StepSchema } from './step.model';
const Schema = mongoose.Schema;

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

export function upsertProject(project, callback) {
  var query = { '_id': project._id };
  Project.updateOne(query, ticket, { upsert: true }, callback);
}

export function deleteProject(id, callback) {
  var query = { '_id': id };
  Project.deleteOne(query, callback);
}
