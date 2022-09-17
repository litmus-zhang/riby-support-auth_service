const Mailjet = require('node-mailjet');

const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
);

const request =  (useremail, username ) => mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: "Support@riby.ng",
                Name: "RIBY",
              },
              To: [
                {
                  Email: useremail,
                  Name: username,
                }
              ],
              Subject: "Your email flight plan!",
              TextPart: `Dear ${username}, welcome to Riby! May the delivery force be with you!`,
              HTMLPart: `<h3>Dear ${username}, You requested for a password reset, click<a href=\"https://www.mailjet.com/\">here</a>! to reset your password</h3><br />May the delivery force be with you!`
            }
          ]
        })


request
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log(err.statusCode)
    })

module.exports = request;