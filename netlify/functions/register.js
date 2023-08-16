const faunadb = require('faunadb')

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })
const q = faunadb.query


exports.handler = async (event, context) => {
  const { email, password } = JSON.parse(event.body)

  try {
    const user = await client.query(
      q.Create(q.Collection('users'), {
        data: { email, password },
      })
    )

    return {
      statusCode: 200,
      body: JSON.stringify({ user: user.data }),
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
