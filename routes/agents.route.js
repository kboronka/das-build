import express from 'express';
import passport from 'passport';
import {
  Agent,
  getAgents,
  getAgentById,
  registerAgent,
  deleteAgent
} from '../models/agent.model';

const router = express.Router();

// Get list of agents
router.get('/', (req, res) => {
  getAgents((err, agents) => {
    if (err) {
      res.status(400);
      res.json(err);
    } else {
      res.json(agents);
    }
  });
});

// Get agent
router.get('/:id', (req, res) => {
  getAgentById(req.params.id, (err, agent) => {
    if (err) {
      res.status(400);
      res.json(err);
    } else {
      res.json(agent);
    }
  });
});

// register new agent or update existing agent
router.post('/register',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let agent = new Agent({
      name: req.body.name,
      type: req.body.type,
      port: req.body.port,
      ip: req.connection.remoteAddress
    });

    registerAgent(agent, (err, agent) => {
      if (err) {
        res.status(400);
        res.json({ success: false, msg: err });
      } else {
        res.status(201);
        res.json({ success: true, agent });
      }
    });
  }
);


// Delete agent
router.get('/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    deleteAgent(req.params.id, (err, success) => {
      if (err) {
        res.status(400);
        res.json({ success: false, msg: err });
      } else {
        res.json({ success: true, msg: 'agent deleted' });
      }
    });
  }
);

module.exports = router;