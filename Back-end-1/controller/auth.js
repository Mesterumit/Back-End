// Auth Controller:

const jwt = require('jsonwebtoken')
const setToken = require('../helpers/setToken')

const User = require('../module/user')

module.exports = {

    login: async (req, res) => {

        const { username, password } = req.body

        if (username && password) {

            const user = await User.findOne({ username, password })
            // console.log(user)
            if (user) {

                if (user.isActive) {

                    res.send({
                        error: false,
                        token: setToken(user),
                        user: {
                            email: user.email,
                            username: user.username,
                            isAdmin: user.isAdmin,
                            isStaff: user.isStaff,
                            isActive: user.isActive
                        }
                    })

                } else {

                    res.errorStatusCode = 401
                    throw new Error('This account is not active.')
                }
            } else {

                res.errorStatusCode = 401
                throw new Error('Wrong username or password.')
            }
        } else {

            res.errorStatusCode = 401
            throw new Error('Please enter username and password.')
        }
    },

    refresh: async (req, res) => {

        const refreshToken = req.body?.token?.refresh

        if (refreshToken) {

            jwt.verify(refreshToken, process.env.REFRESH_KEY, async function (err, userData) {

                if (err) {

                    res.errorStatusCode = 401
                    throw err
                } else {

                    const { _id, password } = userData

                    if (_id && password) {

                        const user = await User.findOne({ _id })

                        if (user && user.password == password) {

                            if (user.isActive) {

                                res.send({
                                    error: false,
                                    token: setToken(user, true)
                                })

                            } else {

                                res.errorStatusCode = 401
                                throw new Error('This account is not active.')
                            }
                        } else {

                            res.errorStatusCode = 401
                            throw new Error('Wrong id or password.')
                        }
                    } else {

                        res.errorStatusCode = 401
                        throw new Error('Please enter id and password.')
                    }
                }
            })

        } else {
            res.errorStatusCode = 401
            throw new Error('Please enter token.refresh')
        }
    },

    logout: async (req, res) => {

        res.send({
            error: false,
            message: 'No need any doing for logout. You must deleted Bearer Token from your browser.'
        })

    },

}