const http = require('node:http');
require('dotenv').config()

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.TRANSPORT_HOST,
  port: process.env.TRANSPORT_PORT,
  auth: {
    user: process.env.TRANSPORT_USER,
    pass: process.env.TRANSPORT_PASSWORD,
  },
});

const hostname = 'localhost';
const port = 4000;

const allowedOrigin = 'http://localhost:3000';

async function sendEmail(email, name) {
  const info = await transporter.sendMail({
    from: "Tattoo service <tattoo-service@mail.ru>",
    to: email,
    subject: "Hello",
    html: `Hello, dear <b>${name}</b>`,
  });

  return info;
}

async function requestHandler (request, response) {
  let requestBody = [];

  if (request.method === 'POST') {
    request
    .on('data', (chunk) => {
      requestBody.push(chunk)
    })
    .on('end', async () => {
      try {
        requestBody = JSON.parse(Buffer.concat(requestBody).toString());

        if (requestBody.name, requestBody.email) {
          await sendEmail(requestBody.email, requestBody.name);

        } else {
          response.statusCode = 400;
          response.setHeader('Access-Control-Allow-Origin', allowedOrigin)
          response.setHeader('Content-Type', 'text/json');
          response.end(JSON.stringify({any: 'any'}));
        }

        response.statusCode = 201;
        response.setHeader('Access-Control-Allow-Origin', allowedOrigin)
        response.setHeader('Content-Type', 'text/json');
        response.end(JSON.stringify({status: 'SUCCESS'}));
      } catch (error) {
        response.statusCode = 400;
        response.setHeader('Access-Control-Allow-Origin', allowedOrigin)
        response.setHeader('Content-Type', 'text/json');
        response.end(JSON.stringify({error: JSON.stringify(error)}));
      }
    })
  }
  
}

const server = http.createServer(requestHandler);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
