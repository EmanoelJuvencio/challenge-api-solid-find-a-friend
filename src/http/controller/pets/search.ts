import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { $Enums } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetQuerySchema = z.object({
    city: z.string(),
    name: z.string().optional(),
    age: z
      .enum([
        $Enums.Age.BABY,
        $Enums.Age.TEENAGER,
        $Enums.Age.YOUNG_ADULT,
        $Enums.Age.ADULT,
        $Enums.Age.ELDERLY,
        $Enums.Age.ADVANCED_ELDERLY,
      ])
      .optional(),
    energyLevel: z
      .enum([
        $Enums.EnergyLevel.VERY_LOW,
        $Enums.EnergyLevel.LOW,
        $Enums.EnergyLevel.MEDIUM,
        $Enums.EnergyLevel.HIGH,
        $Enums.EnergyLevel.VERY_HIGH,
      ])
      .optional(),
    independence: z
      .enum([
        $Enums.Independence.VERY_LOW,
        $Enums.Independence.LOW,
        $Enums.Independence.MEDIUM,
        $Enums.Independence.HIGH,
        $Enums.Independence.VERY_HIGH,
      ])
      .optional(),
    size: z
      .enum([
        $Enums.Size.MINI,
        $Enums.Size.SMALL,
        $Enums.Size.MEDIUM,
        $Enums.Size.LARGE,
        $Enums.Size.GIANT,
      ])
      .optional(),
    page: z.coerce.number().default(1),
  })

  const { name, age, city, energyLevel, independence, size, page } =
    searchPetQuerySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsUseCase()

  const pets = await searchPetsUseCase.execute({
    name,
    age,
    city,
    energy_level: energyLevel,
    independence,
    size,
    page,
  })

  reply.status(200).send(pets)
}
