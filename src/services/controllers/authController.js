import { User } from '../models/user.js'
import { hashPassword, comparePasswords } from '../helpers/auth.js'
import jwt from 'jsonwebtoken'

export const test = (req, res) => {
    res.json('test is working')
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // check if name was entered
        if (!name) {
            return res.json({ msgError: 'Name is required' })
        }
        // check if password is good
        if (!password || password.length < 6) {
            return res.json({ msgError: 'Password is required and should be at least 6 characters long' })
        }
        // check email
        const exist = await User.findOne({ email })
        if (exist) {
            return res.json({ msgError: 'Email is taken already' })
        }

        const hashPasswd = await hashPassword(password)
        // Create user in database
        const user = await User.create({
            name,
            email,
            password: hashPasswd
        })
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // Check if user exist
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ msgError: 'User does not exist' })
        }

        // Check password match
        const match = await comparePasswords(password, user.password)
        if (match) {
            // create token user identify
            jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.REACT_APP_JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
                if (err) {
                    throw err
                }
                res.cookie('token', token).json(user)
            })
        } else {
            return res.json({ msgError: 'Wrong password' })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getProfile = async (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.REACT_APP_JWT_SECRET, {}, (err, user) => {
            if (err) {
                throw err
            }
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { id, name, email, adress, phone, currentPassword, password, confirmPassword } = req.body
        if (password === undefined) {
            const user = await User.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    name,
                    email,
                    adress,
                    phone
                }
            )
            return res.json(user)
        } else { // change password
            // check if password is good
            if (password.length < 6) {
                return res.json({ msgError: 'Password is required and should be at least 6 characters long' })
            }
            if (password !== confirmPassword) {
                return res.json({ msgError: 'Passwords don\'t match' })
            }

            // Check password match
            const user = await User.findOne({ email })
            const match = await comparePasswords(currentPassword, user.password)

            if (match) {
                const hashPasswd = await hashPassword(password)
                console.log(hashPasswd)
                const user = await User.findOneAndUpdate(
                    {
                        _id: id
                    },
                    {
                        name,
                        email,
                        adress,
                        phone,
                        password: hashPasswd
                    }
                )
                console.log(user)
                return res.json(user)
            } else {
                return res.json({ msgError: 'Current password is not correct' })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const logout = async (req, res) => {
    res.cookie('token', '').json(true)
}