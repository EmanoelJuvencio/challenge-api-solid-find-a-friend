import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { details } from './details'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  // Daqui para baixo rotas publicas
  app.get('/pets', search)
  app.get('/pets/:id', details)
  // Daqui para baixo Rotas authenticadas
  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
