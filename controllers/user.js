const prisma = require("../client")

const getUser = async (req, res) => {
    const { userId } = req.params
    const currentUser = req.userId;

    await prisma.$connect()
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                userId: userId
            },
                include: {
                    organisations: true
                }
        })

        if(userId != currentUser){
            const current = await prisma.user.findUnique({
                where: {
                    userId: currentUser
                },
                include: {
                    organisations: true
                }
            })
            if(!current.organisations.filter(org => user.organisations.include(org))){
                throw new Error("You are not allowed to view this user!");
            }}
        
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

module.exports = {
    getUser
}