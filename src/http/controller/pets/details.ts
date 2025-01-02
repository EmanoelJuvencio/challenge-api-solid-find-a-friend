import { PetNotFoundError } from '@/use-cases/errors/pet-not-found'
import { makeDetailsPetUseCase } from '@/use-cases/factories/make-details-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

interface IRequestParams {
  id: string
}

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as IRequestParams

  const detailsPetUseCase = makeDetailsPetUseCase()

  try {
    const pet = await detailsPetUseCase.execute({ id })
    reply.status(200).send(pet)
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
