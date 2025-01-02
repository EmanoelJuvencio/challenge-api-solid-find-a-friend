import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetNotFoundError } from '../errors/pet-not-found'

interface IDetailsPetUseCaseRequest {
  id: string
}

interface IDetailsPetUseCaseResponse {
  pet: Pet | null
}

export class DetailsPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: IDetailsPetUseCaseRequest): Promise<IDetailsPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }
}
