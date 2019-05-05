import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let AgentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  port: {
    type: Number,
    required: true
  }
});

export const Agent = mongoose.model('Agent', AgentSchema);

export function getAgents(callback) {
  Agent.find(callback);
}

export function getAgentById(id, callback) {
  Agent.findById(id, callback);
}

export function registerAgent(agent, callback) {
  var query = { name: agent.name };
  Agent.findOne(query, (err, res) => {
    if (err) {
      return callback(err, null);
    } else if (!res) {
      Agent.create(agent, (err, res) => {
        return callback(err, res);
      });
    } else {
      agent._id = new ObjectId(res._id);
      var query = { _id: agent._id };
      Agent.updateOne(query, agent, (err, res) => {
        return callback(err, agent);
      });
    }
  });
}

export function updateAgent(id, agent, callback) {
  agent._id = new ObjectId(id);
  var query = { _id: agent._id };
  Agent.updateOne(query, agent, (err, res) => {
    return callback(err, agent);
  });
}

export function deleteAgent(id, callback) {
  var query = { _id: new ObjectId(id) };
  Agent.deleteOne(query, callback);
}