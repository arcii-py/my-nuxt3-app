const faunadb = require('faunadb')

const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET3 })
const q = faunadb.query


exports.handler = async (event, context) => {
  const { email, password } = JSON.parse(event.body)

  try {
    const user = await client.query(
      q.Get(q.Match(q.Index('users_by_email'), email))
    )

    if (user.data.password !== password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid credentials' }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ token: 'YOUR_TOKEN', user: user.data }),
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
