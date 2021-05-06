'use strict';
const { port } = require('../config');
const firebase = require('../db');
const firestore = firebase.firestore();



const config = require('../config');

const mailjet = require('node-mailjet')
.connect(config.mailjetConfig.apiKey, config.mailjetConfig.secretKey);
// const Nylas = require('nylas');


// const nylas = Nylas.with(config.nylasConfig.accessToken);

const sendEmail = async(req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('contacts').doc().set(data);

        //mailjet.connect(config.mailjetConfig.apiKey, config.mailjetConfig.secretKey);

        const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
          "Messages":[
            {
              "From": {
                "Email": "makarim178@gmail.com",
                "Name": "Mir Ashiful Karim"
              },
              "To": [
                {
                  "Email": data.contactDetails.email,
                  "Name": data.contactDetails.name
                },
                {
                    "Email": "makarim178@gmail.com",
                    "Name": "Mir Ashiful Karim"
                }
              ],
              "Subject": data.subject,
              "TextPart": "Thank you for contacting me.",
              "HTMLPart": data.body,
              "CustomID": "AppGettingStartedTest"
            }
          ]
        }).then((result) => {
            res.send(result.Status);
        }).catch((err) => {
            console.log(err.statusCode);
        })
        
        // Nylas.config({
        //     clientId: config.nylasConfig.clientId,
        //     clientSecret: config.nylasConfig.clientSecret
        // });
        // const draft = nylas.drafts.build({
        //     subject: data.subject,
        //     body: data.body,
        //     to: data.contactDetails
        // });
        
        // draft.send().then(message => {
        //     //console.log(message);
        //     res.send('Email sent, and saved successfully!');
        // })

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    sendEmail
}
