const request = require('supertest')
const app = require('../app')

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