const express =  require('express');
const { addCourses, updateCourses, getCourses, removeCourse, getCourse, getCoursesByEduId } = require('../controllers/educationController');
const { addPortfolio, getPortfolio, getPortfolioById, updatePortfolio, deletePortfolio, getEducations, updateEducation, getEducationById } = require('../controllers/portfolioController');
const { addProject, getProjects, getProject, updateProject, removeProject } = require('../controllers/projects');
const { addSkills, getSkills, getSKill, updateSkill, removeSkill } = require('../controllers/skills');
const { addWE, getWEs, updateWe, removeWe, getWeById } = require('../controllers/workExperienceController');
const { sendEmail } = require('../controllers/contact');
const { addLinks, getLinks, getLink, updateLink, removeLink } = require('../controllers/links');


const router =  express.Router();

// basic portfolio
router.post('/portfolio', addPortfolio);
router.get('/portfolios', getPortfolio);
router.get('/portfolio/:id', getPortfolioById);
router.put('/portfolio/:id', updatePortfolio);
router.delete('/portfolio/:id', deletePortfolio);
router.get('/educations', getEducations);
router.get('/education/:id', getEducationById);
router.put('/education/:id', updateEducation);

// courses
router.post('/course', addCourses);
router.put('/course/:id', updateCourses);
router.get('/courses', getCourses);
router.delete('/course/:id', removeCourse);
router.get('/course/:id', getCourse);
router.get('/courses/edu/:id', getCoursesByEduId);


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


// send e-mail
router.post('/contact', sendEmail);

// Links
router.post('/links', addLinks);
router.get('/links', getLinks);
router.get('/link/:id', getLink);
router.put('/link/:id', updateLink);
router.delete('/link/:id', removeLink);

module.exports = {
    routes: router
}