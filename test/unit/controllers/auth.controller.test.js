const request = require('supertest')
const mockingoose = require('mockingoose')

const app = require('../../../src/app')
const User = require('../../../src/models/User')

describe('Auth Controller - Register', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })

  it('should register a new user and return a JWT token', async () => {
    // Mock User.create to simulate saving to the database
    mockingoose(User).toReturn({}, 'save')

    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword',
      role: 'user',
    }

    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(userData)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success', true)
    expect(response.body).toHaveProperty('token')
  })

  it('should return an error if required fields are missing', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({})

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('success', false)
    expect(response.body).toHaveProperty('error')
  })
})
