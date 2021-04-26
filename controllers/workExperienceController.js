'use strict';
const { port } = require('../config');
const firebase = require('../db');
const firestore = firebase.firestore();

const addWE = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('workExperiences').doc().set(data);

        res.send('Records saved successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getWEs = async(req, res, next) => {
    try {
        const we = await firestore.collection('workExperiences');
        const data = await we.get();
        const wes = [];

        data.forEach(doc => {
            const work = {
                id: doc.id,
                jobTitle: doc.data().jobTitle,
                companyName: doc.data().companyName,
                companyLocation: doc.data().companyLocation,
                url: doc.data().url,
                jobDescs: doc.data().jobDesc,
                yearStarted: doc.data().yearStarted,
                yearEnded: doc.data().yearEnded
            }
            wes.push(work);
        });

        res.send(wes);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getWeById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const we = await firestore.collection('workExperiences').doc(id);
        const data = await we.get();

        if(!data.exists) {
            res.status(400).send('No Data Found');
        } else {
            res.send(data.data());
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}
const updateWe = async(req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const we = await firestore.collection('workExperiences').doc(id);
        await we.update(data);
        res.send('Successfully updated');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const removeWe = async(req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('workExperiences').doc(id).delete();
        res.send('Successfully removed');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addWE,
    getWEs,
    updateWe,
    removeWe,
    getWeById
}