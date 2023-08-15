const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
});

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const subscription = JSON.parse(event.body);

  try {
    await client.query(
      q.Create(q.Collection('subscriptions'), {
        data: subscription
      })
    );
    console.log('Subscription saved to FaunaDB.');
  } catch (error) {
    console.error('Error saving subscription to FaunaDB:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Subscription received!" }),
  };
};
