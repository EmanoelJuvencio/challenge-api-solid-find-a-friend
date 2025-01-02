import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { DetailsPetUseCase } from '../pets/details'

export function makeDetailsPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new DetailsPetUseCase(petsRepository)

  return useCase
}
