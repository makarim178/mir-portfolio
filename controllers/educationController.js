'use strict';
const { port } = require('../config');
const firebase = require('../db');
const firestore = firebase.firestore();


const addCourses = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('courses').doc().set(data);

        res.send('Records saved successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCourses = async(req, res, next) => {
    try {
        const course = await firestore.collection('courses');
        const doc = await course.get();

        const courses = [];

        doc.forEach(course => {
            const cor = {
                id: course.id,
                courseName: course.data().courseName,
                desc: course.data().desc,
                educationId: course.data().educationId,
                grade: course.data().grade
            }
            courses.push(cor);
        });

        res.send(courses);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCourse = async(req,res,next) => {
    try {
        const id = req.params.id;
        const course = await firestore.collection('courses').doc(id);
        const data = await course.get();
        if(!data.exists) {
            res.status(400).send('No Data Found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCoursesByEduId = async(req, res, next) => {
    try {
        const id = req.params.id;
        const courses = firestore.collection('courses');
        
        const query = await courses.where('educationId', '==', id).get().then((snapshot) => {
            const coursesById = [];
            snapshot.docs.forEach(doc => {
                coursesById.push(doc.data());
            });
            
            // console.log(coursesById);
            return coursesById;
        });
        
        if(!query.exists == 0){
            res.status(400).send('No Data Found!');
        } else {
            res.send(query);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateCourses = async(req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const courses = await firestore.collection('courses').doc(id);
        await courses.update(data);
        res.send('Course Updated successfully');
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const removeCourse = async(req, res, next) => {
    try {
        const id  = req.params.id;
        await firestore.collection('courses').doc(id).delete();        
        res.send('Course removed sucessfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addCourses,
    updateCourses,
    getCourses,
    removeCourse,
    getCourse,
    getCoursesByEduId
}
