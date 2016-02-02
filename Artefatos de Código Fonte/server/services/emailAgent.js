var nodemailer = require('nodemailer');
var template = require('./emailTemplate');

var emailAuth = {
    user: 'no-reply@everemind.herokuapp.com',
    pass: 'evestaff321'
};

var transporter = nodemailer.createTransport({
    service: "Zoho",
    auth: emailAuth
});

var defaultRetries = 3;

exports.sendEmail = function(emailTo, emailSubject, emailHtml, serverURL, callback){
    emailHtml = emailHtml || "";
    var emailTemplate = template.replace("{{content}}", emailHtml);
    emailTemplate = emailTemplate.replace("{{siteURL}}", serverURL);
    var mailOptions = {
        from: "SysRadoc <" + emailAuth.user + ">",
        to: emailTo || "",
        subject: emailSubject || "",
        html: emailTemplate,
    };

    callback = callback || function(){};

    var doSend = function(tries){
        tries--;
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                if(tries > 0)
                    console.log("Retry[" + (defaultRetries - tries) + "/" + defaultRetries + "]...");
                else{
                    console.log("Out of retries.");
                    callback(error, info);
                }
                doSend(tries);
            }
            else{
                console.log('Message sent: ' + info.response);
                callback(error, info);
            }
        });
    };

    doSend(defaultRetries);
};
