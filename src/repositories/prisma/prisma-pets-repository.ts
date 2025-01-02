import { Pet, Prisma } from '@prisma/client'
import { IFindManyPetsData, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findManyPets({
    city,
    name,
    age,
    energy_level,
    independence,
    size,
    page,
  }: IFindManyPetsData): Promise<Pet[] | null> {
    const pets = await prisma.pet.findMany({
      where: { org: { city }, name, age, energy_level, independence, size },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({ where: { id } })

    return pet
  }

  async create(data: Prisma.PetCreateManyInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }
}
