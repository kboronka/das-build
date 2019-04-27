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
