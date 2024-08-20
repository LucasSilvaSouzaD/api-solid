import type { UsersRepository } from '@/repositories/users-repository'
import type { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUseProfileUseCaseRequest {
  userId: string
}

interface GetUseProfileUseCaseResponse {
  user: User
}

export class GetUseProfileUseCase {
  constructor(private UsersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUseProfileUseCaseRequest): Promise<GetUseProfileUseCaseResponse> {
    const user = await this.UsersRepository.findyById(userId)

    if (!user) throw new ResourceNotFoundError()

    return {
      user,
    }
  }
}
