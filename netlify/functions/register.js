const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET
});

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body);

  // Check if user already exists
  try {
    const existingUser = await client.query(
      q.Get(q.Match(q.Index("users_by_email"), data.email))
    );

    if (existingUser) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "User already exists" }),
      };
    }
  } catch (error) {
    // User not found is expected, so no action needed
  }

  // Create new user
  try {
    const newUser = await client.query(
      q.Create(q.Collection("users"), {
        data: {
          email: data.email,
          password: data.password, // Note: You should hash the password before storing
          // ... any other data fields
        },
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(newUser),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
