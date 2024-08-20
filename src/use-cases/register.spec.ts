import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { compare } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      name: 'Jhon',
      email: 'jhon@gmail.com',
      password: '123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      name: 'Jhon',
      email: 'jhontest@gmail.com',
      password: '123',
    })

    const isPasswordCorrectlyHashed = await compare('123', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able register with same email twice', async () => {
    const email = 'jhon@example.com'

    await registerUseCase.execute({
      name: 'Jhon',
      email,
      password: '123',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'Jhon',
        email,
        password: '123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
