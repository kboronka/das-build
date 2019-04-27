import express from 'express';
import passport from 'passport';
import { Project, getProjects, upsertProject, deleteProject } from '../models/project.model';

const router = express.Router();

// Get list of projects
router.get('/', (req, res) => {
  getProjects((err, projects) => {
    if (err) {
      console.log(err);
    } else {
      res.json(projects);
    }
  });
});

// Create new project
router.post('/create',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let newProject = new Project({
      name: req.body.name,
      trunkUrl: req.body.trunkUrl,
      steps: []
    });

    upsertProject(newProject, (err, project) => {
      if (err) {
        res.json({ success: false, msg: err });
      } else {
        res.json({ success: true, msg: 'project registered' });
      }
    });
  }
);

// Profile
router.get('/:id/delete',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {


    res.json({ user: req.user });
  }
);

module.exports = router;
