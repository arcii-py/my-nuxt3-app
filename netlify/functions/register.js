const faunadb = require('faunadb');
const bcrypt = require('bcrypt');

const q = faunadb.query;
const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET3 });
const SALT_ROUNDS = 10;

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const { email, password } = req.body;

    try {
        // Check if email exists in FaunaDB
        let user = await faunaClient.query(
            q.Get(q.Match(q.Index('users_by_email'), email))
        );

        if (user) {
            return res.status(400).json({ success: false, message: 'Email already registered.' });
        }

        // Hash the password and store the user in FaunaDB
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        user = await faunaClient.query(
            q.Create(q.Collection('users'), {
                data: { email, password: hashedPassword }
            })
        );

        return res.status(200).json({ success: true, message: 'Registration successful.' });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
