const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const { User } = require('../utils/validate')

const prisma = new PrismaClient()

const userReg = async (req, res) => {
    const data = req.body
    
    // validate fields
    const validationResult = User.safeParse(data)

    if(!validationResult.success){
        const errors = validationResult.error.issues.map(e => {
            return {
                field: e.path[0],
                message: e.message 
            }
        })

        return res.status(422).json({
            errors
        })
    }
    try {
        // check for duplicate email

        // hash password

        // generate uuid
        await prisma.user.create({
            ...data,
            password: "",
            userId: ""
        })
        return res.status(201).json({
            status: "success",
            message: "Registration successful"
        })
    } catch (error) {
        console.error(error)

        return res.status(400).json({
            status: "Bad Request",
            message: "Registration unsuccessful",
            statusCode: 400
        })
        
    }
}

const userLogin = (req, res) => {
    const data = req.body
    try {
        // fetch for user with email
        const user = prisma.user.find({ email: data.email })
        // compare password
        if(!bcrypt.compare(data.password, user.password)){
            throw new Error("Invalid password!")
        }

        // generate jwt
    } catch (error) {
        console.error(error)

        return res.status(401).json({
            status: "Bad Request",
            message: "Authentication failed",
            statusCode: 401
        })
    }
}

module.exports = {
    userReg,
    userLogin
}