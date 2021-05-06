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
            const ius = [];
            const ts = [];
            const vus = [];
            let count = 1;

            doc.data().imageUrls.forEach(el => {
                const iu = {
                    id: count++,
                    imageUrl: el
                }
                ius.push(iu);
            });

            count = 1;

            doc.data().tools.forEach(el => {
                const tls = {
                    id: count++,
                    tool: el
                };

                ts.push(tls);
            })

            count = 1;

            doc.data().videoUrls.forEach(el => {

                const vs = {
                    id: count++,
                    videoUrl: el
                };

                vus.push(vs);
            });

            const proj = {
                id: doc.data().id,
                title: doc.data().title,
                mainImage: doc.data().mainImage,
                desc: doc.data().desc,
                category: doc.data().category,
                imageUrls: doc.data().imageUrls,
                siteUrl: ius,
                projectUrl: doc.data().projectUrl,
                tools: ts,
                videoUrls: vus
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