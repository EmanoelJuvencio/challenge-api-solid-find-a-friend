import { PetsRepository } from '@/repositories/pets-repository'
import { $Enums, Pet } from '@prisma/client'

interface ISearchPetUseCaseRequest {
  city: string
  name: string | undefined
  age: $Enums.Age | undefined
  size: $Enums.Size | undefined
  independence: $Enums.Independence | undefined
  energy_level: $Enums.EnergyLevel | undefined
  page: number
}

interface ISearchPetUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    name,
    age,
    energy_level,
    independence,
    size,
    page,
  }: ISearchPetUseCaseRequest): Promise<ISearchPetUseCaseResponse> {
    console.log(city, name, age, energy_level, independence, size)

    const pets = await this.petsRepository.findManyPets({
      city,
      name,
      age,
      energy_level,
      independence,
      size,
      page,
    })

    if (!pets) {
      return { pets: [] }
    }

    return { pets }
  }
}
