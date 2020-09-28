const http = require('http');
const admin = require('firebase-admin');
var adminInit = false;
const express = require('express')
const app = express()
//Middleware...
app.use(express.json())




app.post('/sendNotification', function (req, res) {

    let notificationData = req.body;
    let title = notificationData.title;
    let description = notificationData.description;
    console.log(title+"   "+description);

    var serviceAccount = require('./fcm-example-d62f4-firebase-adminsdk-cuto4-7ab68096c0.json');

    if (adminInit == false) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://fcm-example-d62f4.firebaseio.com"
        });
        adminInit = true;
    }

    // Define a condition which will send to devices which are subscribed
// to either the Google stock or the tech industry topics.
    var condition = "'weather' in topics || 'industry-tech' in topics";

// See documentation on defining a message payload.
    var message = {
        notification: {
            title: title,
            body: description
        },
        condition: condition
    };

    // Send a message to devices subscribed to the combination of topics
// specified by the provided condition.
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
    res.send('<h1>Website is working</h1>',)
    res.end()
})

const PORT = process.env.PORT || 1010
app.listen(PORT, function (err) {
    if (err){
        console.log(err)
    }else {
    console.log('Server is running on port: ' + PORT)
    }

})




/*var server = http.createServer(function (req, res) {
    res.writeHead(200,{'Content-Type':'text/html'})
    res.write('<h1>hfdjfyhjkjh</h1>');
    res.end();*/

/*   if (req.url=="/"){

       res.writeHead(200,{'Content-Type':'text/html'})

       var serviceAccount = require("C:\\Users\\User\\Desktop\\fcm-example-d62f4-firebase-adminsdk-cuto4-7ab68096c0.json");

       if (adminInit==false){
           admin.initializeApp({
               credential: admin.credential.cert(serviceAccount),
               databaseURL: "https://fcm-example-d62f4.firebaseio.com"
           });
           adminInit = true;
       }





       // Define a condition which will send to devices which are subscribed
// to either the Google stock or the tech industry topics.
       var condition = "'weather' in topics || 'industry-tech' in topics";

// See documentation on defining a message payload.
       var message = {
           notification: {
               title: '$FooCorp up 1.43% on the day',
               body: '$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.'
           },
           condition: condition
       };

// Send a message to devices subscribed to the combination of topics
// specified by the provided condition.
       admin.messaging().send(message)
           .then((response) => {
               // Response is a message ID string.
               console.log('Successfully sent message:', response);
           })
           .catch((error) => {
               console.log('Error sending message:', error);
           });




       /!*!// The topic name can be optionally prefixed with "/topics/".
               var topic = 'weather';

               var message = {
                   data: {
                       score: '850',
                       time: '2:45'
                   },
                   topic: topic
               };

       // Send a message to devices subscribed to the provided topic.
               admin.messaging().send(message)
                   .then((response) => {
                       // Response is a message ID string.
                       console.log('Successfully sent message:', response);
                   })
                   .catch((error) => {
                       console.log('Error sending message:', error);
                   });
       *!/



       var a=6;
       var b= 7;
       var c= a+b;

       res.write("value"+c);
       res.end();
   }else if (req.url=="/contact"){
       res.writeHead(200,{'Content-Type':'text/json'})
       res.write('<h1>Alhamdulillah</h1> <br><h1>This is Contact Page</h1>')
       res.end();
   }
*/
//});
//server.listen(5050);
//console.log("Server Run Success");

// Initialize the default app

/*var app = admin.initializeApp();*/


/*// Create a list containing up to 500 registration tokens.
// These registration tokens come from the client FCM SDKs.
const registrationTokens = [
    'YOUR_REGISTRATION_TOKEN_1',
    // …
    'YOUR_REGISTRATION_TOKEN_N',
];

const message = {
    data: {score: '850', time: '2:45'},
    tokens: registrationTokens,
}


admin.messaging().sendMulticast(message)
    .then((response) => {
        console.log(response.successCount + ' messages were sent successfully');});*/


