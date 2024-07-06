const request = require('supertest')
const app = require('../app')

test('no request body', async () => {
    const response = await request(app)
                                        .post('/auth/register')
    expect(response.statusCode).toBe(422)
    expect(response.body).toEqual({
        "errors": [
            {
                "field": "firstname",
                "message": "First name is required"
            },
            {
                "field": "lastname",
                "message": "Last name is required"
            },
            {
                "field": "password",
                "message": "Password is required"
            },
            {
                "field": "phone",
                "message": "Phone number is required"
            },
            {
                "field": "email",
                "message": "Email is required"
            }
        ]
    })
})

test('invalid data', async () => {
    const response = await request(app)
                                        .post('/auth/register')
                                        .send({
                                            firstname: "A",
                                            lastname: "K",
                                            password: "ab23",
                                            phone: "078967",
                                            email: "jackie@gmail"
                                        })
    expect(response.statusCode).toBe(422)
    expect(response.body).toEqual({
        "errors": [
            {
                "field": "firstname",
                "message": "Please enter a valid first name"
            },
            {
                "field": "lastname",
                "message": "Please enter a valid last name"
            },
            {
                "field": "password",
                "message": "Password is too short"
            },
            {
                "field": "phone",
                "message": "Invalid phone number"
            },
            {
                "field": "email",
                "message": "Invalid email address"
            }
        ]
    })
})