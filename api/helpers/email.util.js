const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const logger = require('../utils/loggers/common.logger')
const Mail = require('nodemailer/lib/mailer')

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
            // type: 'LOGIN',
        // user: process.env.MAIL_DEV, // generated ethereal user
        // pass: process.env.MAIL_PASSWORD // generated ethereal password
        user: "support@trakiyalighting.com",
        pass: "100Kilatashaci"
    },
    tls: {
        rejectUnauthorized: false
    }
})

const defaults = {
    domain: process.env.URL,
    from: {
        info: `Control System Website Support <${process.env.MAIL_DEV}>`
    },
    anchors: {
        home: `${process.env.URL}`,
        contact: `${process.env.URL}/contact-us`
    }
}

const emailTemplates = {
    welcomeAD: {
        from: defaults.from.info,
        subject: 'Welcome to ReflexGym\'s Website',
        template: path.join(__dirname, 'email-templates', 'welcomeAD.hbs'),
        content (data) {
            if (!data.token) {
                const tokenNotFoundError = new Error('No account verification "token" found in email data.')
                logger.error(tokenNotFoundError)
            }

            return {
                email: data.to,
                token: data.token,
                // verifyEmailUrl: data.token ? `${process.env.FE_URL}/account/password/setup/${data.token}/${data.uId}` : process.env.URL,
                verifyEmailUrl: 'google.com',
                firstName: data.firstName,
                lastName: data.lastName,
                // openMailClientUrl: `mailto:${process.env.MAIL_DEV}?subject=NOT requested password creation&body= I have recently received a password create email that I didn’t request. Could you please investigate the case further?`
                openMailClientUrl: `mailto:support@trakiyalighting.com?subject=NOT requested password creation&body= I have recently received a password create email that I didn’t request. Could you please investigate the case further?`
            }
        }
    },
    resetPassword: {
        from: defaults.from.info,
        subject: 'Reset your password',
        template: path.join(__dirname, 'email-templates', 'reset-password.hbs'),
        content (data) {
            if (!data.token) {
                const tokenNotFoundError = new Error('No password reset "token" found in email data.')
                logger.error(tokenNotFoundError)
            }

            if (!data.to) {
                const toNotFoundError = new Error('No receiver ("to") found in email data.')
                logger.error(toNotFoundError)
            }
            return {
                // resetPasswordUrl: (data.token && data.to) ? `${process.env.FE_URL}/account/password/reset/${data.token}/${data.uId}/` : process.env.URL,
                firstName: data.firstName,
                lastName: data.lastName,
                // openMailClientUrl: `mailto:${process.env.MAIL_DEV}?subject=NOT requested password reset&body= I have recently received a password reset email that I didn’t request. Could you please investigate the case further?`
                openMailClientUrl: `mailto:support@trakiyalighting.com?subject=NOT requested password creation&body= I have recently received a password create email that I didn’t request. Could you please investigate the case further?`
            }
        }
    }
}

async function sendEmail (which, to, data, callback = () => {}, cc) {
    try {
        const foundTemplate = emailTemplates[which]
        if (!foundTemplate || !foundTemplate.content) {
            const templateNotFoundError = new Error(`Email template not found. Available templates are: ${Object.keys(emailTemplates)}`)
            logger.error(templateNotFoundError)
            return callback(templateNotFoundError)
        }

        const templateFile = fs.readFileSync(foundTemplate.template, 'utf-8')
        const htmlCompilator = handlebars.compile(templateFile)
        const content = Object.assign(defaults, foundTemplate.content(data))
        const subject = typeof foundTemplate.subject === 'string' ? foundTemplate.subject : foundTemplate.subject(data)

        const email = {
            from: "support@trakiyalighting.com",
            to: to,
            subject: subject,
            html: htmlCompilator(content),
            replyTo: 'kitodorov13@gmail.com'
        }          

        return transporter.sendMail(email, (err) => {
            if (err) {
                logger.error('%o', err)
                err.message = 'Oops, our mailing servers are not responding. Please try again later.'
                return callback(err)
            }

            logger.info(`[APP] Sending email to '${email.to}'`)
            return callback(null)
        })
    } catch (err) {
        logger.error('%o', err)
        throw err
    }
}

module.exports = {
    sendEmail
}
