import { $Enums, Pet, Prisma } from '@prisma/client'

export interface IFindManyPetsData {
  city: string
  name: string | undefined
  age: $Enums.Age | undefined
  size: $Enums.Size | undefined
  independence: $Enums.Independence | undefined
  energy_level: $Enums.EnergyLevel | undefined
  page: number
}

export interface PetsRepository {
  create(data: Prisma.PetCreateManyInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyPets(findManyData: IFindManyPetsData): Promise<Pet[] | null>
}
