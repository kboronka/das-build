import express from 'express';
import passport from 'passport';
import {
  PullRequest,
  getPullRequests,
  getPullRequestById,
  getPullRequestsByProject,
  addPullRequest,
  deletePullRequest,
  States
} from '../models/pull-request.model';

const router = express.Router();

// get list of pull requests
router.get('/', (req, res) => {
  getPullRequests((err, branches) => {
    if (err) {
      res.status(400);
      res.json(err);
    } else {
      res.json(branches);
    }
  });
});

// get a single pull request
router.get('/:id', (req, res) => {
  getPullRequestById(req.params.id, (err, branch) => {
    if (err) {
      res.status(400);
      res.json(err);
    } else {
      res.json(branch);
    }
  });
});

// get all pull request for a project
router.get('/project/:project', (req, res) => {
  getPullRequestsByProject(req.params.project, (err, branch) => {
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
    let branch = new PullRequest({
      name: req.body.name,
      description: req.body.description,
      repo: req.body.repo,
      author: req.body.author,
      state: States.RequiresAppoval,
      created: req.body.created,
      approvers: []
    });

    if (req.body.ticket) {
      branch.ticket = req.body.ticket;
    }

    if (req.body.ticketUrl) {
      branch.ticketUrl = req.body.ticketUrl;
    }

    addPullRequest(branch, (err, branch) => {
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
    deletePullRequest(req.params.id, (err, success) => {
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