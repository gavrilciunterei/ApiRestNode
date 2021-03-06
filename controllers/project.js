var Project = require('../models/project');
var fs = require('fs');

var controller = {
  home: function (req, res) {
    return res.status(200).send({
      message: 'Soy la home',
    });
  },
  test: function (req, res) {
    return res.status(200).send({
      message: 'Soy la test',
    });
  },
  saveProject: function (req, res) {
    var project = new Project();
    var params = req.body; //guarda la info que enviamos en una variable

    project.name = params.name;
    project.description = params.description;
    project.category = params.category;
    project.year = params.year;
    project.langs = params.langs;
    project.image = null;

    //guarda y comprueba el resultado
    project.save((err, projectStored) => {
      if (err) {
        return res.status(500).send({ message: 'Error al guardar' });
      }
      if (!projectStored) {
        return res
          .status(404)
          .send({ message: 'No se ha podido guardar el proyecto' });
      }

      //si esta bien lo muestra
      return res.status(200).send({ project: projectStored });
    });
  },

  getProject: function (req, res) {
    //coge la id que pasas en la url y la busca
    var projectId = req.params.id;

    if (projectId == null) {
      return res.status(404).send({ message: 'El proyeto no existe1' });
    }

    Project.findById(projectId, (err, project) => {
      if (err) {
        return res.status(500).send({ message: 'Error al devolver los datos' });
      }
      if (!project) {
        return res.status(404).send({ message: 'El proyeto no existe' });
      }

      return res.status(200).send({ project });
    });
  },

  getProjects: function (req, res) {
    Project.find({}) //sacamos todos los proyectos con find y ordenamos por ano
      .sort('+year')
      .exec((err, proyects) => {
        if (err) {
          return res
            .status(500)
            .send({ message: 'Error al devolver los datos' });
        }
        if (!proyects) {
          return res.status(404).send({ message: 'Los proyetos no existen' });
        }
        return res.status(200).send({ proyects });
      });
  },
  updateProject: function (req, res) {
    //buscamos por id y reemplazamos con contenido nuevo
    var projectId = req.params.id;
    var update = req.body;

    //{new:true} es para que devuelva el objeto modificado
    Project.findByIdAndUpdate(
      projectId,
      update,
      { new: true },
      (err, projectUpdated) => {
        if (err) {
          return res.status(500).send({ message: 'Error al actualizar' });
        }
        if (!projectUpdated) {
          return res.status(404).send({ message: 'El proyeto no existe' });
        }

        return res.status(200).send({ project: projectUpdated });
      }
    );
  },
  deleteProject: function (req, res) {
    var projectId = req.params.id;
    //si no va es findByIdAndRemove
    Project.findByIdAndDelete(projectId, (err, projectDeleted) => {
      if (err) {
        return res.status(500).send({ message: 'Error al actualizar' });
      }
      if (!projectDeleted) {
        return res.status(404).send({ message: 'El proyeto no existe' });
      }

      return res.status(200).send({ project: projectDeleted });
    });
  },
  uploadImage: function (req, res) {
    var projectId = req.params.id;
    var fileName = 'Imagen no subida';

    if (req.files) {
      //sacamos la ruta y de ahi sacamos el nombre del archivo
      var fileParh = req.files.image.path;
      var fileSplit = fileParh.split('\\');
      var fileName = fileSplit[1];

      //comprobar la extension del archivo
      var extensionSplit = fileName.split('.');
      var fileExtension = extensionSplit[1];

      if (fileExtension == 'png' || fileExtension == 'jpg') {
        Project.findByIdAndUpdate(
          projectId,
          { image: fileName },
          { new: true },
          (err, projectUpdated) => {
            if (err) {
              return res.status(500).send({ message: 'Error al actualizar' });
            }
            if (!projectUpdated) {
              return res.status(404).send({ message: 'El proyeto no existe' });
            }

            return res.status(200).send({
              project: projectUpdated,
            });
          }
        );
      } else {
        fs.unlink(fileParh, (err) => {
          return res.status(200).send({ message: 'La extension no es valida' });
        });
      }
    }
  },
};

module.exports = controller;
