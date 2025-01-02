/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({ cache: true })
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
