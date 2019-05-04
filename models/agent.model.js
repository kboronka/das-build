import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let AgentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  host: {
    type: String,
    required: true
  },
  port: Number,
  token: String,
  sandbox: String
});

export const Agent = mongoose.model('Agent', AgentSchema);

export function getAgents(callback) {
  Agent.find(callback);
}

export function getAgentById(id, callback) {
  Agent.findById(id, callback);
}

export function addAgent(Agent, callback) {
  Agent.create(Agent, callback);
}

export function updateAgent(id, Agent, callback) {
  Agent._id = new ObjectId(id);
  var query = { _id: Agent._id };
  Agent.updateOne(query, Agent, callback);
}

export function deleteAgent(id, callback) {
  var query = { _id: new ObjectId(id) };
  Agent.deleteOne(query, callback);
}