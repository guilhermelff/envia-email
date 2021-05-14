const nodemailer = require('nodemailer');

const { MAIL_USER, MAIL_PASS } = process.env;

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
    },
});



module.exports.sendEmail = async (event, context, callback) => {

    const requestBody = JSON.parse(event.body);
    const email = requestBody.email;
    const text = requestBody.text;



    let info = await transport.sendMail({
        from: '"Cupido" <noreply@cupido.com>',
        to: email,
        subject: 'Nova mensagem anônima',
        text,
    });


    const response = {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'Ola esse eh um teste',
            }),
    };

    callback(null, response);
};