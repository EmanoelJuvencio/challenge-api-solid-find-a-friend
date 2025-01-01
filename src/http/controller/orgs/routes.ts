import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/authenticate', authenticate)

  // Daqui para baixo Rotas authenticadas
  app.addHook('onRequest', verifyJWT)
}
