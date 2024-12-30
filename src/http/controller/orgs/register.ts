import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-Error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    state: z.string(),
    city: z.string(),
    street: z.string(),
    district: z.string(),
    zip_code: z.string(),
    password: z.string().min(6),
  })

  const bodyValidated = createOrgBodySchema.parse(request.body)

  const createOrgUseCase = makeRegisterOrgUseCase()

  try {
    await createOrgUseCase.execute(bodyValidated)
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
