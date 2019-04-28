import express from 'express';
const router = express.Router();

import Issue from '../models/issue.model';

router.get('/', (req, res) => {
  Issue.find((err, issues) => {
    if (err) {
      console.log(err);
    } else {
      res.json(issues);
    }
  });
});

router.get('/:id', (req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (err) {
      console.log(err);
    } else {
      res.json(issue);
    }
  });
});

router.post('/add', (req, res) => {
  let issue = new Issue(req.body);
  issue.save()
    .then(issue => {
      res.status(200).json({ 'issue': 'Added successfully' });
    })
    .catch(err => {
      res.status(400).send('Failed to create a new record');
    });
});

router.post('/update/:id', (req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (!issue || err) {
      res.status(400).send('issue not found');
    } else {
      issue.title = req.body.title;
      issue.responsible = req.body.responsible;
      issue.description = req.body.description;
      issue.severity = req.body.severity;
      issue.status = req.body.status;

      issue.save()
        .then(issue => {
          res.status(200).json({ 'issue': 'Updated successfully' });
        })
        .catch(err => {
          res.status(400).send('Failed to update record');
        });
    }
  });
});

router.get('/delete/:id', (req, res) => {
  Issue.findByIdAndRemove(req.params.id, (err, issue) => {
    if (!err) {
      res.status(200).json({ 'issue': 'Removed successfully' });
    } else {
      res.status(400).send('Failed to remove record');
    }
  });
});

module.exports = router;
