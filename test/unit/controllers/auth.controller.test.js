const {
  register,
} = require('../../../src/controllers/auth.controller')
const createUser = require('../../../src/services/auth.service')

// Jest basic config
jest.mock('../../../src/services/auth.service')

describe('register', () => {
  it('should register a new user and send token response', async () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        role: 'user',
      },
    }

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    }

    const mockUser = {
      /* mock user data */
    }
    createUser.mockResolvedValueOnce(mockUser)

    await register(req, res)

    expect(createUser).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
      role: 'user',
    })

    expect(res.status).toHaveBeenCalledWith(200)
    expect(
      res.json
    ).toHaveBeenCalledWith(/* Expected token response */)
  })
})
