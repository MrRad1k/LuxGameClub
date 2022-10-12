require('dotenv').config()
const nodemailer = require('nodemailer')


class NodeMailer {
    mailer(email, password) {
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
            subject: "Регистрация в Cyberclub",
            html: `<h3>Почта: ${email} <br/>Пароль: ${password}</h3>`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
            else
                console.log('Email sent: ' + info.response);
        })
    }
}

module.exports = new NodeMailer()