const prisma = require('../client')
const { Organisation } = require('../utils/validate')
const { v4: uuidv4 } = require('uuid')

const getUserOrgs = (req, res) => {
    try {
        const orgs = prisma.organisation.findMany({ 
            where: {
                users: userId
            }
         })

        return res.json({
            status: "success",
            message: "Organizations successully found!",
            data: {
              organisations: orgs
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

const getOrg = (req, res) => {
    try {
        const org = prisma.organisation.findUniqueOrThrow({ 
            where: {
                orgId: id
            }
         })

         return res.status(200).json({
            status: "success",
            message: "Organization successully found!",
            data: {
              ...org
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
                    update: {
                        where: {
                            orgId: orgId,
                        },
                        data: {
                            user: userId
                        }
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

        const org = user.organisations.find(org => orgId == org_id)

        return res.json({
            status: "success",
            message: "Organizations successully found!",
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