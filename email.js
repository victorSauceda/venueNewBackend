const AWS = require('aws-sdk');
const ses = new AWS.SES();

let successMsg = {
    statusCode: 200,
    body: 'Email Successfully Sent',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    }
}

let errorMsg = {
    statusCode: 500,
    body: 'Email send failed',
    headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    }
}

export async function main(event) {
    const email = JSON.parse(event.body)

    console.log('Event body: ', event.body);
    console.log('Email: ', email)

    let body = {
        to: email.recipient,
        from: email.sender,
        subject: email.subject,
        htmlBody: email.htmlBody,
        textBody: email.textBody
    }
    console.log('Body object: ', body)
    try {
        const result = await sendEmail(body);
        console.log('Sent email successfully', result);
    } catch(e) {
        console.log('Email send error: ', e)
        return errorMsg;
    }
    return successMsg;

};

function sendEmail(email) {
    const params = {
        Destination: {
            ToAddresses: [email.to],
        },
        Message: {
            Subject: {
                Data: email.subject,
            },
            Body: {
                Html: {
                    Data: email.htmlBody || email.textBody,
                },
                Text: {
                    Data: email.textBody || email.htmlBody,
                },
            },
        },
        Source: email.from,
    };
    return ses.sendEmail(params).promise();
}
