import mongoose from 'mongoose';
import { Test } from 'tslint';
const Schema = mongoose.Schema;

export const StepSchema = new Schema({
  description: String,
  command: {
    type: String,
    required: true
  },
  arguments: {
    type: String,
    required: true
  },
  retryCount: {
    type: Number,
    required: true
  }
});

export const Step = mongoose.model('Step', StepSchema);
