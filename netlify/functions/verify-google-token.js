// /netlify/functions/verify-google-token.js

const { OAuth2Client } = require('google-auth-library');
const faunadb = require('faunadb');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const FAUNA_SECRET = process.env.FAUNA_SECRET;

const client = new OAuth2Client(CLIENT_ID);
const q = faunadb.query;
const faunaClient = new faunadb.Client({ secret: FAUNA_SECRET });

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { id_token } = JSON.parse(event.body);

  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];

    // Check if user exists in FaunaDB
    let user = await faunaClient.query(
      q.Get(q.Match(q.Index('users_by_id'), userId))
    );

    if (!user) {
      // If user doesn't exist, create a new user record
      user = await faunaClient.query(
        q.Create(q.Collection('users'), {
          data: {
            id: userId,
            email: payload['email'],
            name: payload['name'],
            picture: payload['picture'],
          },
        })
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, user: user.data }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
