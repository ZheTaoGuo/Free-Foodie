require('dotenv').config()
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;

console.log(accountSid);
console.log(authToken);
var client = require('twilio')("ACe263110fb64c00f8282e33cd0110dcb6","f0fa31067130df423bb63b8a67b49fc4")
client.messages.create({
    to: process.env.PURCHASED_NUMBER,
    from: process.env.PHONE_NUMBER,
    body: 'test message'
}).then(message => console.log(message.sid));