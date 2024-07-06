const prisma = require("../client")

const getUser = async (req, res) => {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                userId: userId
            }
        })

        return res.status(200).json({
            status: "success",
            message: "User successfully found!",
            data: {
                userId: user.userId,
                firstName: user.firstName,
                lastName:  user.lastName,
                email: user.email,
                phone: user.phone
        }
        })
        
    } catch (error) {
        console.error(error)
        
        return res.status(404).json({
            "status": "Bad Request",
            "message": "Client error",
            "statusCode": 404
        })
    }
}