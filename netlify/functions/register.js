const faunadb = require('faunadb');
const bcrypt = require('bcrypt');
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET3
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

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  // Create new user with hashed password
  try {
    const newUser = await client.query(
      q.Create(q.Collection("users"), {
        data: {
          email: data.email,
          password: hashedPassword, // Store the hashed password
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
