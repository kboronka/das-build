import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let PullRequestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  repo: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  approved: Boolean
});

export const PullRequest = mongoose.model('PullRequest', PullRequestSchema);

export function getPullRequests(callback) {
  PullRequest.find(callback);
}

export function getPullRequestById(id, callback) {
  PullRequest.findById(id, callback);
}

export function addPullRequest(pullRequest, callback) {
  var query = { name: pullRequest.name };
  PullRequest.findOne(query, (err, res) => {
    if (err) {
      return callback(err, null);
    } else if (!res) {
      PullRequest.create(pullRequest, (err, res) => {
        return callback(err, res);
      });
    } else {
      pullRequest._id = new ObjectId(res._id);
      var query = { _id: pullRequest._id };
      PullRequest.updateOne(query, pullRequest, (err, res) => {
        return callback(err, pullRequest);
      });
    }
  });
}

export function approvePullRequest(id, callback) {
  project._id = new ObjectId(id);
  var query = { _id: project._id };
  var update = { $set: { "approved": true } };
  Project.updateOne(query, update, callback);
}

export function deletePullRequest(id, callback) {
  var query = { _id: new ObjectId(id) };
  PullRequest.deleteOne(query, callback);
}