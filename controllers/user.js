const getUser = (req, res) => {
    try {
        
    } catch (error) {
        console.error(error)
        
        return res.status(404).json({
            "status": "Bad Request",
            "message": "Client error",
            "statusCode": 404
        })
    }
}