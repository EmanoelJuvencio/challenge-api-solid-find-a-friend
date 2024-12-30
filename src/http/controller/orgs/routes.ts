import { FastifyInstance } from 'fastify'
import { register } from './register'
// import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function orgsRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJWT)

  // app.get('/gyms/search', search)
  // app.get('/gyms/nearby', nearby)

  app.post('/orgs', register)
}
