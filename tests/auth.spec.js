const request = require('supertest')
const app = require('../app')
const { prismaMock } = require('../singleton')

describe('POST /auth/register', () => {
    test('creating a user with no request body', async () => {
        const response = await request(app)
            .post('/auth/register')
        expect(response.statusCode).toBe(422)
        expect(response.body).toEqual({
            "errors": [
                {
                    "field": "firstName",
                    "message": "First name is required"
                },
                {
                    "field": "lastName",
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

        const user = prismaMock.user.findUnique({
            where: { email: 'ndianguimichelle@gmail.com' },
            include: { organization: true }
          });
          expect(user).not.toBeNull();
      
          const organization = user.organization;
          expect(organization).not.toBeNull();
          expect(organization.userId).toBe(user.id);

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