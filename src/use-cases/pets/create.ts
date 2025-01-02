import { PetsRepository } from '@/repositories/pets-repository'
import { $Enums, Pet } from '@prisma/client'

interface ICreatePetUseCaseRequest {
  name: string
  about: string
  age: $Enums.Age
  energy_level: $Enums.EnergyLevel
  independence: $Enums.Independence
  size: $Enums.Size
  org_id: string
}

interface ICreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    energy_level,
    independence,
    size,
    org_id,
  }: ICreatePetUseCaseRequest): Promise<ICreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      energy_level,
      independence,
      size,
      org_id,
    })

    return { pet }
  }
}
