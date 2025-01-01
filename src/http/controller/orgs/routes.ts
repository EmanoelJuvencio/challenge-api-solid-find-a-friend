import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/authenticate', authenticate)
  app.get('/refresh-token', refresh)

  // Daqui para baixo Rotas authenticadas
  app.addHook('onRequest', verifyJWT)
}
