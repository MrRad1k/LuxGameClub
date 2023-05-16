require('dotenv').config()
const nodemailer = require('nodemailer')


class MailTrainerActivate {
    mailer(email) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_LOGIN,
                pass: process.env.EMAIL_PASSWORD,
            }
        })

        const mailOptions = {
            from: process.env.EMAIL_LOGIN,
            to: process.env.EMAIL_LOGIN,
            subject: "Регистрация в Cyberclub.",
            html:
                `
                <div>
                    <h1>Вы были подтверждены ${email}</h1>
                    <br/>
                    <a href="${process.env.API_URL}"
                </div>
                `
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
            else console.log('Email sent: ' + info.response);
        })
    }
}

module.exports = new MailTrainerActivate()