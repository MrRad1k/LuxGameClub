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

    async sendActivationMail(link, trainerEmail, trainerName, photo, trainerCity, trainerOld, trainerAbout) {
        await this.transporter.sendMail({
            from: process.env.EMAIL_LOGIN,
            to: process.env.EMAIL_LOGIN,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Активировать аккаунта тренера</h1>
                        <h3>Почта: ${trainerEmail}</h3>
                        <h3>Имя: ${trainerName}</h3>
                        <h3>Город: ${trainerCity}</h3> 
                        <h3>Возраст: ${trainerOld}</h3>
                        <h3>Качества: ${trainerAbout}</h3>
                        
                        <h3>Фото: ${process.env.API_URL + "/" + photo}</h3> 

                        <br/>    
                        <h3>Ссылка для подтверждения:</h3>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
}

module.exports = new MailService()