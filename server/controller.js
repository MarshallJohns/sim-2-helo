const bcrypt = require('bcryptjs')

module.exports = {
    registerUser: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body

        const [user] = await db.check_user([username])
        if (user) {
            return res.status(409).send('Username already taken')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const [newUser] = await db.register_user([username, hash])
        res.status(200).send(newUser)
    },

    login: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body

        const [existingUser] = await db.check_user([username])

        if (!existingUser) {
            return res.status(404).send('User not found')
        }

        const isAuthenticated = bcrypt.compareSync(password, existingUser.password)

        if (!isAuthenticated) {
            return res.status(403).send('Incorrect email or password')
        }

        delete existingUser.password

        res.status(200).send(existingUser)
    }
}