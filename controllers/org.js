const getUserOrgs = (req, res) => {
    try {
        return res.json({
            message: "in"
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
        
    } catch (error) {
        console.error(error)

        return res.status(404).json({
            status: "Bad Request",
            message: "Client error",
            statusCode: 404
        })
        
    }
}

const addUserToOrg = (req, res) => {
    try {
        
    } catch (error) {
        console.error(error)

        return res.status(400).json({
            status: "Bad Request",
            message: "Client error",
            statusCode: 400
        })
        
    }
}

const addOrg = (req, res) => {
    try {
        
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