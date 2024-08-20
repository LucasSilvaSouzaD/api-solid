import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let checkInUseCase: CheckInUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    checkInUseCase = new CheckInUseCase(checkInsRepository)
  })

  it('should be able to checkIn', async () => {
    const { user } = await checkInUseCase.execute({
      name: 'Jhon',
      email: 'jhon@gmail.com',
      password: '123',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
