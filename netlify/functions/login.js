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

  try {
    // Retrieve the user from FaunaDB
    const user = await client.query(
      q.Get(q.Match(q.Index("users_by_email"), data.email))
    );

    // Compare the provided password with the hashed password in FaunaDB
    const isPasswordValid = await bcrypt.compare(data.password, user.data.password);

    if (!isPasswordValid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid password" }),
      };
    }

    // Here, you would typically generate and return a JWT or some other form of token for authentication
    // For simplicity, we're just returning a success message
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Login successful" }),
    };

  } catch (error) {
    if (error.name === 'NotFound') {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
