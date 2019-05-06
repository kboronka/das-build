import express from 'express';
import passport from 'passport';
import {
  Project,
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject
} from '../models/project.model';

const router = express.Router();

// Get list of projects
router.get('/', (req, res) => {
  getProjects((err, projects) => {
    if (err) {
      res.status(400);
      res.json(err);
    } else {
      res.json(projects);
    }
  });
});

// Get project
router.get('/:id', (req, res) => {
  getProjectById(req.params.id, (err, projects) => {
    if (err) {
      res.status(400);
      res.json(err);
    } else {
      res.json(projects);
    }
  });
});

// Create new project
router.post('/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (!req.user.admin) {
      res.status(401);
      return res.json({ "message": "unauthorized - admin only" })
    }

    let newProject = new Project({
      name: req.body.name,
      trunkUrl: req.body.trunkUrl,
      steps: []
    });

    addProject(newProject, (err, project) => {
      if (err) {
        res.status(400);
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
    if (!req.user.admin) {
      res.status(401);
      return res.json({ "message": "unauthorized - admin only" })
    }

    let newProject = new Project({
      name: req.body.name,
      trunkUrl: req.body.trunkUrl,
      slackWebhook: req.body.slackWebhook,
      steps: req.body.steps
    });

    updateProject(req.params.id, newProject, (err, project) => {
      if (err) {
        res.status(400);
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
    if (!req.user.admin) {
      res.status(401);
      return res.json({ "message": "unauthorized - admin only" })
    }

    deleteProject(req.params.id, (err, success) => {
      if (err) {
        res.status(400);
        res.json({ success: false, msg: err });
      } else {
        res.json({ success: true, msg: 'project deleted' });
      }
    });
  }
);

module.exports = router;