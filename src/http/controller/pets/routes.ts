import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'

export async function petsRoutes(app: FastifyInstance) {
  // Daqui para baixo rotas publicas

  // Daqui para baixo Rotas authenticadas
  app.addHook('onRequest', verifyJWT)
  app.post('/pets', create)
}
