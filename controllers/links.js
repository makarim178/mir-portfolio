'use strict';
const firebase = require('../db');
const firestore = firebase.firestore();

const addLinks = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('links').doc().set(data);
        res.send('Links saved successfully!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getLinks = async(req, res, next) => {
    try {
        const linksRef = await firestore.collection('links');
        const linksData = await linksRef.get();

        const links = [];

        linksData.forEach(doc => {
            const link = {
                id: doc.id,
                linkName: doc.data().linkName,
                url: doc.data().url
            }

            links.push(link);
        });

        res.send(links);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getLink = async (req, res, next) => {
    try {
        const id = req.params.id;
        const linkRef = await firestore.collection('links').doc(id);
        const link = await linkRef.get();

        res.send(link.data());
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateLink = async(req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const linkRef = await firestore.collection('links').doc(id);
        
        await linkRef.update(data);
        res.send('Updated Successfully!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const removeLink = async(req, res, next) => {
    try {
        const id = req.params.id;
        const linkRef = await firestore.collection('links').doc(id).delete();

        res.send('Link Removed successfully!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports ={
    addLinks,
    getLinks,
    getLink,
    updateLink,
    removeLink
}