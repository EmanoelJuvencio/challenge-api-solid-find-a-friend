import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { details } from './details'

export async function petsRoutes(app: FastifyInstance) {
  // Daqui para baixo rotas publicas
  app.get('/pets/:id', details)
  // Daqui para baixo Rotas authenticadas
  app.addHook('onRequest', verifyJWT)
  app.post('/pets', create)
}
