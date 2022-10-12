const nodemailer = require("nodemailer");

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_LOGIN,
                pass: process.env.EMAIL_PASSWORD,
            }
        })
    }

    async sendActivationMail(link, trainerEmail) {
        await this.transporter.sendMail({
            from: process.env.EMAIL_LOGIN,
            to: process.env.EMAIL_LOGIN,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Активировать аккаунта тренера ${trainerEmail}</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
}

module.exports = new MailService()