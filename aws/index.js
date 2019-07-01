'use strict';
const https = require('https');
const request = require('request');

// Enter your Form.io project API key here, which will provide AWS Lambda requests
// admin privilages.
let apiKey = '6kl7Dh7LYKWJQb3CVqLshCJLOjpciR';

const API_URL = 'https://bhtugrzkcspdujs.form.io';

// The lambda event execution context.
exports.handler = (event, context, callback) => {
  // The user will make a request to Lambda and provide his/her JWT Token
  // We will now use the "current" endpoint within our project to determine the

  const authRequest = request(
    {
      method: 'POST',
      hostname: API_URL,
      path: '/admin/submission',
      headers: {
        'content-type': 'application/json',
      },
      body: {
        data: {
          email: 'bogdanteren4un@gmail.com',
          password: '123qwe',
        },
      },
      json: true,
    },
    (error, response, body) => {
      if (error) throw new Error(error);

      const userToken = response.headers['x-jwt-token'];
    }
  );

  // full user object from that token.
  const requestForm = https.request(
    {
      hostname: API_URL,
      path: '/demographics/submission',
      method: 'GET',
      headers: {
        'x-jwt-token': event.jwtToken,
      },
    },
    requestUserResponse => {
      let demographics = '';
      requestUserResponse.setEncoding('utf8');
      requestUserResponse.on('data', chunk => (demographics += chunk));
      requestUserResponse.on('end', () => {
        // We now have the full user object. Parse it as a JSON object.
        demographics = JSON.parse(demographics);
        console.log(demographics);

        // Here is where you could do something to validate the user...
        // Such as, send a request to payment processor to validate payment
        // token, etc.

        // Say that this user is now valid.
        demographics.data.valid = true;

        // Now perform a PUT reqeust to update the user record as an administrator.
        // We will use the x-token header which utilizes the Project API key to perform
        // the update.
        const updateForm = https.request(
          {
            hostname: 'https://bhtugrzkcspdujs.form.io',
            path: '/demographics/submission/' + demographics._id,
            method: 'PUT',
            headers: {
              'x-token': apiKey,
              'Content-Type': 'application/json',
            },
          },
          updateFormResponse => {
            // The user is now updated and valid.
            callback(null, demographics);
          }
        );
        updateForm.on('error', callback);
        updateForm.end(JSON.stringify(demographics));
      });
    }
  );
  requestForm.on('error', callback);
  requestForm.end();
};
