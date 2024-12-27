import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from '@/env'

export const app = fastify()

app.get('/', () => {
  return { message: 'Hello World' }
})

app.setErrorHandler((error, _request, reply) => {
  console.log(error)

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal Server Error.' })
})
