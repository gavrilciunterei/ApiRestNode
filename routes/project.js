const express = require('express');
var ProjectConstroller = require('../controllers/project');

//configuracuin multiparty (para subir archivos)
var multipart = require('connect-multiparty');
//ruta donde se guardan los archivos
var multipartMiddleware = multipart({ uploadDir: './uploads' });

const router = express.Router();
router.get('/home', ProjectConstroller.home);
router.post('/test', ProjectConstroller.test);
router.post('/save-project', ProjectConstroller.saveProject);
router.get('/project/:id?', ProjectConstroller.getProject);
router.get('/projects', ProjectConstroller.getProjects);
router.put('/project/:id', ProjectConstroller.updateProject);
router.delete('/project/:id', ProjectConstroller.deleteProject);
router.post(
  '/upload-image/:id',
  multipartMiddleware,
  ProjectConstroller.uploadImage
);

module.exports = router;
