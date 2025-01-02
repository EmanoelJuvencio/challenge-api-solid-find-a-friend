import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { $Enums } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.enum([
      $Enums.Age.BABY,
      $Enums.Age.TEENAGER,
      $Enums.Age.ADULT,
      $Enums.Age.YOUNG_ADULT,
      $Enums.Age.ELDERLY,
      $Enums.Age.ADVANCED_ELDERLY,
    ]),
    energy_level: z.enum([
      $Enums.EnergyLevel.VERY_LOW,
      $Enums.EnergyLevel.LOW,
      $Enums.EnergyLevel.MEDIUM,
      $Enums.EnergyLevel.HIGH,
      $Enums.EnergyLevel.VERY_HIGH,
    ]),
    independence: z.enum([
      $Enums.Independence.VERY_LOW,
      $Enums.Independence.LOW,
      $Enums.Independence.MEDIUM,
      $Enums.Independence.HIGH,
      $Enums.Independence.VERY_HIGH,
    ]),
    size: z.enum([
      $Enums.Size.MINI,
      $Enums.Size.SMALL,
      $Enums.Size.MEDIUM,
      $Enums.Size.LARGE,
      $Enums.Size.GIANT,
    ]),
    org_id: z.string().uuid(),
  })

  const body = createPetBodySchema.parse(request.body)

  const createpetUseCase = makeCreatePetUseCase()

  await createpetUseCase.execute(body)

  reply.status(201).send()
}
