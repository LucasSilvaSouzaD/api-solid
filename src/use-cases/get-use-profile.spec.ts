import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUseProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let getUseProfileUseCase: GetUseProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    getUseProfileUseCase = new GetUseProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const getUseProfileUseCase = new GetUseProfileUseCase(usersRepository)

    const createdUser = await usersRepository.create({
      name: 'Lucas',
      email: 'jhon@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await getUseProfileUseCase.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('Lucas')
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(() =>
      getUseProfileUseCase.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
