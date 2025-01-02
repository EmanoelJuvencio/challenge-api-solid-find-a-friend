import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { EmailAlreadyExistsError } from '../errors/email-already-exists-Error'

interface IRegisterUseCaseRequest {
  name: string
  email: string
  whatsapp: string
  state: string
  city: string
  street: string
  district: string
  zip_code: string
  password: string
}

interface IRegisterUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    whatsapp,
    state,
    city,
    street,
    district,
    zip_code,
    password,
  }: IRegisterUseCaseRequest): Promise<IRegisterUseCaseResponse> {
    const userWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      email,
      whatsapp,
      state,
      city,
      street,
      district,
      zip_code,
      password_hash,
    })

    return { org }
  }
}
