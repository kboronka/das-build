import express from 'express';
import passport from 'passport';
import Project from '../models/project.model';

const router = express.Router();

// Create new project
router.post('/create',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let newProject = new Project({
      name: req.body.name,
      trunkUrl: req.body.trunkUrl,
      steps: []
    });

    Project.createProject(newProject, (err, project) => {
      if (err) {
        res.json({ success: false, msg: err });
      } else {
        res.json({ success: true, msg: 'project registered' });
      }
    });
  }
);

// Get list of projects
router.get('/', (req, res) => {
  Project.find((err, projects) => {
    if (err) {
      console.log(err);
    } else {
      res.json(projects);
    }
  });
});

// Profile
router.get('/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ user: req.user });
  }
);

router.get('/validate', (req, res) => {
  res.send('validate');
});

module.exports = router;
