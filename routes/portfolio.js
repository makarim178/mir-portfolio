const express =  require('express');
const { addCourses, updateCourses, getCourses, removeCourse, getCourse } = require('../controllers/educationController');
const { addPortfolio, getPortfolio, getPortfolioById, updatePortfolio, deletePortfolio, getEducations } = require('../controllers/portfolioController');
const { addProject, getProjects, getProject, updateProject, removeProject } = require('../controllers/projects');
const { addSkills, getSkills, getSKill, updateSkill, removeSkill } = require('../controllers/skills');
const { addWE, getWEs, updateWe, removeWe, getWeById } = require('../controllers/workExperienceController');


const router =  express.Router();

// basic portfolio
router.post('/portfolio', addPortfolio);
router.get('/portfolios', getPortfolio);
router.get('/portfolio/:id', getPortfolioById);
router.put('/portfolio/:id', updatePortfolio);
router.delete('/portfolio/:id', deletePortfolio);
router.get('/educations', getEducations);

// courses
router.post('/course', addCourses);
router.put('/course/:id', updateCourses);
router.get('/courses', getCourses);
router.delete('/course/:id', removeCourse);
router.get('/course/:id', getCourse);


// work Experience

router.post('/workexperience', addWE);
router.get('/workexperiences', getWEs);
router.get('/workexperience/:id', getWeById);
router.put('/workexperience/:id', updateWe);
router.delete('/workexperience/:id', removeWe);

// skills

router.post('/skill', addSkills);
router.get('/skills', getSkills);
router.get('/skill/:id', getSKill);
router.put('/skill/:id', updateSkill);
router.delete('/skill/:id', removeSkill);

// projects
router.post('/project', addProject);
router.get('/projects', getProjects);
router.get('/project/:id', getProject);
router.put('/project/:id', updateProject);
router.delete('/project/:id', removeProject);

module.exports = {
    routes: router
}