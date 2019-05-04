import express from 'express';
import passport from 'passport';
import {
  Agent,
  getAgents,
  getAgentById,
  addAgent,
  updateAgent,
  deleteAgent
} from '../models/agent.model';

const router = express.Router();

// Get list of projects
router.get('/', (req, res) => {
  getAgents((err, projects) => {
    if (err) {
      console.log(err);
    } else {
      res.json(projects);
    }
  });
});

// Get project
router.get('/:id', (req, res) => {
  getAgentById(req.params.id, (err, projects) => {
    if (err) {
      console.log(err);
    } else {
      res.json(projects);
    }
  });
});

// Create new project
router.post('/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let newAgent = new Agent({
      name: req.body.name,
      trunkUrl: req.body.trunkUrl,
      steps: []
    });

    addAgent(newAgent, (err, project) => {
      if (err) {
        console.log(err);
        res.json({ success: false, msg: err });
      } else {
        res.json({ success: true, msg: 'project registered' });
      }
    });
  }
);

// Update project
router.post('/update/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let newAgent = new Agent({
      name: req.body.name,
      trunkUrl: req.body.trunkUrl,
      slackWebhook: req.body.slackWebhook,
      steps: req.body.steps
    });

    updateAgent(req.params.id, newAgent, (err, project) => {
      if (err) {
        console.log(err);
        res.json({ success: false, msg: err });
      } else {
        res.json({ success: true, msg: 'project registered' });
      }
    });
  }
);

// Profile
router.get('/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    deleteAgent(req.params.id, (err, success) => {
      if (err) {
        res.json({ success: false, msg: err });
      } else {
        res.json({ success: true, msg: 'project deleted' });
      }
    });
  }
);

module.exports = router;