const { z } = require('zod')

const User = z.object({
    firstname: z.string({
        required_error: "First name is required"
    }).min(3, {
        message: "Please enter a valid first name"
    }),
    lastname: z.string({
        required_error: "Last name is required"
    }).min(3, {
        message: "Please enter a valid last name"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6, {
        message: "Password is too short"
    }),
    phone: z.string({
        required_error: "Phone number is required"
    }).min(10, {
        message: "Invalid phone number"
    }).max(14, {
        message: "Invalid phone number"
    }),
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email address"
    })
})

const Org = z.object({
    name: z.string({
        message: "Organization name is required"
    }),
    description: z.string()
})

module.exports = {
    User,
    Org
}