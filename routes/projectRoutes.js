const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { upload } = require('../config/cloudinary');

router.route('/')
  .get(getProjects)
  .post(upload.array('images', 5), createProject);

router.route('/:id')
  .get(getProjectById)
  .put(upload.array('images', 5), updateProject)
  .delete(deleteProject);

module.exports = router;
