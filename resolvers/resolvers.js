const User = require("../db/models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const resolvers = {
    Query: {
        user(root, args, ctx, info) {
            return user
        }
    },
    Mutation: {
        async createUser(root, { email, password }, ctx, info) {
            try {
                const hashedPassword = await bcrypt.hash(password, 10)

                const user = await User.create({
                    email,
                    password: hashedPassword
                })

                return user
            } catch (e) {
                console.log(e)
            }
        },
        async loginUser(root, { email, password }, ctx, info) {
            try {
                const user = await User.findOne({where: {email}})

                if (!user) {
                    throw new Error('User not registered')
                }

                const passwordCheck = await bcrypt.compare(password, user.password)
                console.log(user.password)
                if (!passwordCheck) {
                    throw new Error('Wrong email or password')
                }

                const payload = {
                    email,
                    password
                }

                const secret = 'aaa'
                const token = await jwt.sign(payload, secret, {expiresIn: "1d"})

                return token

            } catch(e) {
                console.log(e.message)
            }
        }
    }
}

module.exports = resolvers
