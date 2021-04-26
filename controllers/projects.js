'use strict';
const firebase = require('../db');
const firestore = firebase.firestore();

const addProject = async(req, res, next) => {
    try {
        await firestore.collection('projects').doc().set(req.body);
        res.send('Records saved successsfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getProjects = async( req, res, next) => {
    try {
        const projRef = await firestore.collection('projects');
        const data = await projRef.get();
        const projects = [];

        data.forEach(doc => {
            const proj = {
                id: doc.id,
                categoryName: doc.data().categoryName,
                desc: doc.data().desc,
                thumbnailImageUrl: doc.data().thumbnailImageUrl,
                imageUrls: doc.data().imageUrls,
                projectLinks: doc.data().projectLinks,
                skills: doc.data().skills
            }
            projects.push(proj);
        });
        
        res.send(projects);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getProject = async (req, res, next) => {
    try {
        const id = req.params.id;
        const projRef = await firestore.collection('projects').doc(id);
        const project = await projRef.get();

        if(!project.exists) {
            res.status(400).send('No Data found');
        } else {
            res.send(project.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateProject = async(req, res, next) => {
    try {
        const id = req.params.id;
        const ref = await firestore.collection('projects').doc(id);
        await ref.update(req.body);
        res.send('Records updated successdfully');

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const removeProject = async(req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('projects').doc(id).delete();
        res.send('Record removed successfully!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports= {
    addProject,
    getProjects,
    getProject,
    updateProject,
    removeProject
}