const request = require('supertest')
const app = require('../app')
const { validateToken} = require('../utils/jwt')

describe('POST /auth/register', () => {
    test('creating a user with no first name', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                lastName: 'Ndiangui',
                email: 'ztejd@example.com',
                phone: '0712345678',
                password: '1a2b3c'
            })
        expect(response.statusCode).toBe(422)
        expect(response.body).toEqual({
            "errors": [
                {
                    "field": "firstName",
                    "message": "First name is required"
                }                
            ]
        })
    })


        test('creating a user with no last name', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                firstName: 'Michelle',
                email: 'ztejd@example.com',
                phone: '0712345678',
                password: '1a2b3c'
            })
        expect(response.statusCode).toBe(422)
        expect(response.body).toEqual({
            "errors": [ 
                {
                    "field": "lastName",
                    "message": "Last name is required"
}
            ]
        })
            })

        test('creating a user with no email', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                firstName: 'Michelle',
                lastName: 'Ndiangui',
                phone: '0712345678',
                password: '1a2b3c'
            })
        expect(response.statusCode).toBe(422)
        expect(response.body).toEqual({
            "errors": [
                {
                    "field": "email",
                    "message": "Email is required"
                }
            ]
        })
    })


        test('creating a user with no password', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                firstName: 'Michelle',
                lastName: 'Ndiangui',
                email: 'ztejd@example.com',
                phone: '0712345678'
            })
        expect(response.statusCode).toBe(422)
        expect(response.body).toEqual({
            "errors": [ 
                {
                    "field": "password",
                    "message": "Password is required"
                }
            ]
        })
    })

    test('creating a user with invalid data', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                firstName: "A",
                lastName: "K",
                password: "ab23",
                phone: "078967",
                email: "jackie@gmail"
            })
        expect(response.statusCode).toBe(422)
        expect(response.body).toEqual({
            "errors": [
                {
                    "field": "firstName",
                    "message": "Please enter a valid first name"
                },
                {
                    "field": "lastName",
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
    
    test('successully creating a user and their organization', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                "firstName": "Michelle",
                "lastName": "Ndiangui",
                "email": "ndianguimichelle@gmail.com",
                "phone": "0789564355",
                "password": "a1b2c3"
            })
        expect(response.statusCode).toBe(201)
        expect(response.body.data).toHaveProperty('accessToken')
        expect(response.body.data.user).toHaveProperty('userId')
        expect(response.body.data.user).toHaveProperty('firstName')
        expect(response.body.data.user).toHaveProperty('lastName')
        expect(response.body.data.user).toHaveProperty('email')
        expect(response.body.data.user).toHaveProperty('phone')

        const res2 = await request(app).get('/api/organisations').set('Authorization', `Bearer ${response.body.data.accessToken}`)

        expect(res2.statusCode).toBe(200)
        expect(res2.body.data).toHaveProperty('organisations')
        expec(res2.body.data.organisations).toHaveLength(1)
        expect(res2.body.data.organisations[0].name).toEqual(`${resp.body.data.user.firstName}'s Organisation`)
    }) 

    test('checking for a duplicate email', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                "firstName": "Michelle",
                "lastName": "Muthoni",
                "email": "ndianguimichelle@gmail.com",
                "phone": "0788996783",
                "password": "a3b2c1"
            })

        expect(response.statusCode).toBe(422)
        expect(response.body).toEqual({
            "errors": [
                {
                    "field": "email",
                    "message": "Email is already in use!"
                }
            ]
        })

})
})

describe('POST /auth/login', () => {
    test('logging in with no email', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'ztejd@example.com',
                password: '1a2b3c'
            })
        expect(response.statusCode).toBe(422)
        expect(response.body).toEqual({
            "errors": [
                {
                    "field": "email",
                    "message": "Email is required"
                }
            ]
        })
    })

    test('logging in with no password', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'ztejd@example.com',
                password: ''
            })
        expect(response.statusCode).toBe(422)
        expect(response.body).toEqual({
            "errors": [
                {
                    "field": "password",
                    "message": "Password is required"
                }
            ]
        })
    })

    test('logging in with invalid email', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'ztejd@example',
                password: '1a2b3c'
            })
        expect(response.statusCode).toBe(422)
        expect(response.body).toEqual({
            "errors": [
                {
                    "field": "email",
                    "message": "Invalid email"
                }
            ]
        })
    })

    test('successful login and valid token', async () =>{
        const response = await request(app).post('/auth/login').send({
            "email": "ztejd@example.com",
            "password": "1a2b3c"
        })

                expect(response.statusCode).toBe(200)
        expect(response.body.data).toHaveProperty('accessToken')
        expect(response.body.data.user).toHaveProperty('userId')
        expect(response.body.data.user).toHaveProperty('firstName')
        expect(response.body.data.user).toHaveProperty('lastName')
        expect(response.body.data.user).toHaveProperty('email')
        expect(response.body.data.user).toHaveProperty('phone')

    const token = response.body.data.accessToken
        const decoded = validateToken(token)
        expect(decoded.userId).toBe(response.body.data.user.userId)
        expect(decoded.exp - decode.iat).toEqual(3600)
    })

    test('invalid password', async () =>{
        const response = await request(app).post('/auth/login').send({
            "email": "ztejd@example.com",
            "password": "1a2b3c"
        })

        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({
            "status": "Bad request",
            "message": "Authentication error",
            "statusCode": 401
        })
    })
    
})

describe("testing organisation access", () => {
    let token;
    let org;
    beforeAll(async () => {
        const res = await request(app).post('/auth/login').send({
            "email": "ztejd@example.com",
            "password": "1a2b3c"
        })
        token = res.body.data.accessToken

        const res2 = await request(app).get('/api/organisations').set('Authorization', `Bearer ${token}`)
        org = res2.body.data.organisations[0]
    })

    test('accessing organisation with no token', async () => {
        const res = await request(app).get('/api/organisations')
        expect(res.statusCode).toBe(401)
        expect(res.body).toEqual({
            "status": "Bad request",
        "message": 'Access denied',
         "statusCode": 401
        })
    })

    test('member accessing their organisation', async () => {
        const response = await request(app).get('/api/organisations').set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.data).toHaveProperty('organisations')
        expect(response.body.data.organisations).toHaveLength(1)
    })

    test('user accessing an organisation they are not a member of', async () => {
        const res1 = await request(app).post('/auth/register').send({
            "firstName": "Marie",
            "lastName": "Kamau",
            "email": 'mkamau@gmail.com',
            "phone": "0789567890",
            "password": "a1b2c3"
        })
        const res2 = await request (app).get(`/api/organisations/${org}`)
    }).set('Authorization', `Bearer ${res1.body.data.accessToken}`)

    expect(res2.statusCode).toBe(400)
    expect(res2.body).toEqual({
        "status": "Bad request",
        "message": "Client error",
        "statusCode": 400
    })
})
})