'use strict';
const { port } = require('../config');
const firebase = require('../db');
const Education = require('../models/education');
const Portfolio = require('../models/portfolio');
const firestore = firebase.firestore();


const addPortfolio = async(req, res, next) => {
    try{
        const data = req.body;
        await firestore.collection('portfolio').doc().set(data);

        res.send('Records saved successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getEducations = async(req, res, next) => {
    try {

        const education = await firestore.collection('education');
        const collections = await education.get();
        const educations = [];

        collections.forEach(doc => {
            const edu = new Education (
                doc.id,
                doc.data().instituteName,
                doc.data().instituteAddress,
                doc.data().gradName,
                doc.data().completionRate,
            )
            educations.push(edu);
        });

        res.send(educations);
        
    } catch (error) {
        console.log(error.message);
    }
}

const getPortfolio = async(req, res, next) => {
    try{
        const portfolio = await firestore.collection('portfolio');
        const data = await portfolio.get();
        const portfolios = [];
        if(data.empty) {
            res.status(400).send('No Data found');
        }else {
            data.forEach(doc => {

                const port = new Portfolio(
                    doc.id,
                    doc.data().firstName,
                    doc.data().initialName,
                    doc.data().lastName,
                    doc.data().logo,
                    doc.data().title,
                    doc.data().subTitle,
                    doc.data().titleImageUrl,
                    doc.data().resumeLink,
                    doc.data().aboutImgUrl,
                    doc.data().aboutDesc,
                    doc.data().location,
                    doc.data().email,
                    doc.data().phone,
                    doc.data().links
                );

                portfolios.push(port);
            });
            res.send(portfolios);
        }
    }catch (error) {
        res.status(400).send(error.message);
    }
}

const getPortfolioById = async(req, res, next) => {
    try{
        const id = req.params.id;
        const portfolio = await firestore.collection('portfolio').doc(id);
        const data = await portfolio.get();
        if(!data.exists) {
            res.status(400).send('No Data Found');
        } else {
            res.send(data.data());
        }
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const updatePortfolio = async(req, res, next) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const portfolio = await firestore.collection('portfolio').doc(id);
        await portfolio.update(data);
        res.send('Portfolio has updated successfully');

    }catch(error) {
        res.status(400).send(error.message);
    }
}

const deletePortfolio = async(req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('portfolio').doc(id).delete();        
        res.send('Portfolio deleted!')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addPortfolio,
    getPortfolio,
    getPortfolioById,
    updatePortfolio,
    deletePortfolio,
    getEducations
}