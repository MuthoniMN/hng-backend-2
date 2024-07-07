const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const { User, LoginUser } = require('../utils/validate')
const { v4 : uuidv4 } = require('uuid')
const { generateToken } = require('../utils/jwt')

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
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if(user){
            return res.status(422).json({
                "errors": [
                    {
                        field: "email",
                        message: "Email is already in use!"
                    }
                ]
            })
        }
        // generate uuid
        const uuid = uuidv4()

        const duplicateUuid = await prisma.user.findUnique({
            where: {
                userId: uuid
            }
        })

        if(duplicateUuid){
            return res.status(422).json({
                errors: [
                    {
                        field: "userId",
                        message: "User ID is already in use!"
                    }
                ]
            })
        }

        // generating org id
        const org_id = uuidv4()
        // hash password
        const hashedPwd = await bcrypt.hash(data.password, 10)

        const newUser = await prisma.user.create({
            data: {
                ...data,
                password: hashedPwd,
                userId: uuid,
                organisations: {
                    create: {
                        orgId: org_id,
                        name: `${data.firstName}'s Organization`,
                        description: `Welcome to ${data.firstName}'s Organization`
                    }
                }
            }
        })
        // generating token
        const token = generateToken(newUser.userId)

        return res.status(201).json({
            status: "success",
            message: "Registration successful",
            data: {
                accessToken: token,
                user: {
                    userId: newUser.userId,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    phone: newUser.phone,
                }
    }
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

const userLogin = async (req, res) => {
    const data = req.body
    // validate data
    const validationResult = LoginUser.safeParse(data)

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
        // fetch for user with email
        const user = await prisma.user.findUniqueOrThrow({ where: { email: data.email } })

        // compare password
        if(!bcrypt.compare(data.password, user.password)){
            throw new Error("Invalid password!")
        }

        // generate jwt
        const token = generateToken(user.userId)

        return res.status(201).json({
            status: "success",
            message: "Login successful",
            data: {
                accessToken: token,
                user: {
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                }
    }
        })

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