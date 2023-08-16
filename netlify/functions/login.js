login_server_route = """
const faunadb = require('faunadb');
const bcrypt = require('bcrypt');

const q = faunadb.query;
const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET3 });

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const { email, password } = req.body;

    try {
        // Fetch user from FaunaDB
        let user = await faunaClient.query(
            q.Get(q.Match(q.Index('users_by_email'), email))
        );

        if (!user) {
            return res.status(400).json({ success: false, message: 'Email not registered.' });
        }

        // Compare provided password with stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.data.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: 'Incorrect password.' });
        }

        return res.status(200).json({ success: true, message: 'Login successful.' });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};