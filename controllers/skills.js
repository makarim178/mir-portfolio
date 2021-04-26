'use strict';
const firebase = require('../db');
const firestore = firebase.firestore();

const addSkills = async(req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('skills').doc().set(data);

        res.send('Record saved successfully')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getSkills = async(req, res, next) => {
    try {
        const skRef = await firestore.collection('skills');
        const skData = await skRef.get();
        const skills = [];

        skData.forEach(doc => {
            const skill = {
                id: doc.id,
                skillName: doc.data().skillName,
                skillImageUrl: doc.data().skillImageUrl
            }

            skills.push(skill);
        });

        res.send(skills);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getSKill = async(req, res, next) => {
    try {
        const id = req.params.id;
        const skillRef = await firestore.collection('skills').doc(id);
        const skill = await skillRef.get();

        res.send(skill.data());
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateSkill = async(req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const skillRef = await firestore.collection('skills').doc(id);

        await skillRef.update(data);
        res.send('Updated successfully');

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const removeSkill = async(req, res, next) => {
    try {
        const id = req.params.id;
        const skRef= await firestore.collection('skills').doc(id).delete();

        res.send('successfully removed')
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addSkills,
    getSkills,
    getSKill,
    updateSkill,
    removeSkill
}