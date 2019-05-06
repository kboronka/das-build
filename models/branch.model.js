import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let BranchSchema = new Schema({
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

export const Branch = mongoose.model('Branch', BranchSchema);

export function getBranches(callback) {
  Branch.find(callback);
}

export function getBranchById(id, callback) {
  Branch.findById(id, callback);
}

export function addBranch(branch, callback) {
  var query = { name: branch.name };
  Branch.findOne(query, (err, res) => {
    if (err) {
      return callback(err, null);
    } else if (!res) {
      Branch.create(branch, (err, res) => {
        return callback(err, res);
      });
    } else {
      branch._id = new ObjectId(res._id);
      var query = { _id: branch._id };
      Branch.updateOne(query, branch, (err, res) => {
        return callback(err, branch);
      });
    }
  });
}

export function approveBranch(id, callback) {
  project._id = new ObjectId(id);
  var query = { _id: project._id };
  var update = { $set: { "approved": true } };
  Project.updateOne(query, update, callback);
}

export function deleteBranch(id, callback) {
  var query = { _id: new ObjectId(id) };
  Branch.deleteOne(query, callback);
}