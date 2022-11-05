require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({ 
         body: 'Testing Message for ' + msg,  
         messagingServiceSid: 'MG768ec43a5fd13888fa992b756e8489ea',      
         to: process.env.PHONE_NUMBER 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
