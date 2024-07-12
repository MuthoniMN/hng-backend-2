const { z } = require('zod')

const User = z.object({
    firstName: z.string({
        required_error: "First name is required"
    }),
    lastName: z.string({
        required_error: "Last name is required"
    }),
    password: z.string({
        required_error: "Password is required"
    }),
    phone: z.string({
        required_error: "Phone number is required"
    }),
    email: z.string({
        required_error: "Email is required"
    })
})

const LoginUser = z.object({
    email: z.string({
        required_error: "Email is required"
    }),
    password: z.string({
        required_error: "Password is required"
    })
})

const Organisation = z.object({
    name: z.string({
        required_error: "Organization name is required"
    }),
    description: z.string().optional()
})

module.exports = {
    User,
    LoginUser,
    Organisation
}