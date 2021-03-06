import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase)

    const { name, email, password, driver_license } = request.body

    await createUserUseCase.perform({
      name,
      email,
      password,
      driver_license
    })

    return response.status(201).send()
  }
}

export { CreateUserController }