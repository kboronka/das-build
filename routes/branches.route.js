import express from 'express';
import passport from 'passport';
import {
  Branch,
  getBranches,
  getBranchById,
  addBranch,
  deleteBranch
} from '../models/branch.model';

const router = express.Router();

// get list of branches
router.get('/', (req, res) => {
  getBranches((err, branches) => {
    if (err) {
      res.status(400);
      res.json(err);
    } else {
      res.json(branches);
    }
  });
});

// get a single branch
router.get('/:id', (req, res) => {
  getBranchById(req.params.id, (err, branch) => {
    if (err) {
      res.status(400);
      res.json(err);
    } else {
      res.json(branch);
    }
  });
});

// add a new branch or update existing branch
router.post('/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let branch = new Branch({
      name: req.body.name,
      repo: req.body.repo,
      author: req.body.author,
      approved: false
    });

    addBranch(branch, (err, branch) => {
      if (err) {
        res.status(400);
        res.json({ success: false, msg: err });
      } else {
        res.status(201);
        res.json({ success: true, branch });
      }
    });
  }
);

// approve branch
router.post('/approve/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    approveBranch(req.params.id, (err, branch) => {
      if (err) {
        res.status(400);
        res.json({ success: false, msg: err });
      } else {
        res.json({ success: true, msg: 'branch approved' });
      }
    });
  }
);

// delete branch
router.get('/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    deleteBranch(req.params.id, (err, success) => {
      if (err) {
        res.status(400);
        res.json({ success: false, msg: err });
      } else {
        res.json({ success: true, msg: 'branch deleted' });
      }
    });
  }
);

module.exports = router;