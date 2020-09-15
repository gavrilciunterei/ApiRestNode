const express = require('express');
var ProjectConstroller = require('../controllers/project');

const router = express.Router();
router.get('/home', ProjectConstroller.home);
router.post('/test', ProjectConstroller.test);
router.post('/save-project', ProjectConstroller.saveProject);
router.get('/project/:id?', ProjectConstroller.getProject);
router.get('/projects', ProjectConstroller.getProjects);
router.put('/project/:id', ProjectConstroller.updateProject);
router.delete('/project/:id', ProjectConstroller.deleteProject);

module.exports = router;
