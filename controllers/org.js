const prisma = require('../client')
const { Organisation } = require('../utils/validate')
const { v4: uuidv4 } = require('uuid')

const getUserOrgs = async (req, res) => {
    const { userId } = req
    try {
        const user = await prisma.user.findUnique({
            where: {
                userId: userId
            },
            include: {
                organisations: true
            }
        })
        console.log(user)
        return res.json({
            status: "success",
            message: "Organizations successully found!",
            data: {
              organisations: user.organisations
            }
        })
    } catch (error) {
        console.error(error)

        return res.status(404).json({
            status: "Bad Request",
            message: "Client error",
            statusCode: 404
        })
        
    }
}

const getOrg = async (req, res) => {
    const { userId } = req
    const { orgId } = req.params
    try {
        const user = await prisma.user.findUnique({
            where: {
                userId: userId,
                organisations: {
                    orgId: orgId
                }
            },
            include: {
                organisations: true
            }
        })

         return res.status(200).json({
            status: "success",
            message: "Organization successully found!",
            data: {
              ...user.organisations[0]
            }
        })
        
    } catch (error) {
        console.error(error)

        return res.status(404).json({
            status: "Bad Request",
            message: "Client error",
            statusCode: 404
        })
        
    }
}

const addUserToOrg = async (req, res) => {
    const { userId } = req.body
    const { orgId } = req.params
    try {
        const user = await prisma.user.update({
            where: {
                userId: userId
            },
            data: {
                organisations: {
                        connect: {
                            orgId: orgId
                        }
                }
            },
            include: {
                organisations: true
            }
        })

        return res.json({
            status: "success",
            message: "User added to organisation successfully",
        })
        
    } catch (error) {
        console.error(error)

        return res.status(400).json({
            status: "Bad Request",
            message: "Client error",
            statusCode: 400
        })
        
    }
}

const addOrg = async (req, res) => {
    const { userId } = req
    const data = req.body

    // validate fields
    const validationResult = Organisation.safeParse(data)

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
        // generate uuid
        const org_id = uuidv4()

        // add organisation
        const user = await prisma.user.update({
            where: {
                userId: userId
            },
            data: {
                organisations: {
                    create: {
                        orgId: org_id,
                        ...data
                    }
                }
            },
            include: {
                organisations: true
            }
        })

        const org = user.organisations.find(org => org.orgId == org_id)

        return res.json({
            status: "success",
            message: "Organizations successully added!",
            data: {
              ...org
            }
        })
        
    } catch (error) {
        console.error(error)

        return res.status(400).json({
            status: "Bad Request",
            message: "Client error",
            statusCode: 400
        })
    }
}

module.exports = {
    addOrg,
    getOrg,
    getUserOrgs,
    addUserToOrg
}