import { inject, injectable } from 'tsyringe';

import { hash } from 'bcrypt';

import { UserEntity } from '@modules/users/infra/typeorm/entities/UserEntity';
import { ICreateUserDto } from '@modules/users/domain/dtos/CreateUserDto';
import { IUsersRepository } from '@modules/users/domain/repositories/UsersInterface';

import { AppError } from '@shared/errors';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private _repository: IUsersRepository
  ) { }

  async perform({
    name,
    email,
    password,
    driver_license
  }: ICreateUserDto): Promise<void> {
    const userData: UserEntity = await this._repository.findByEmail(email)
  
    if (userData) throw new AppError('User already exists!')
    
    const hashedPassword = await hash(password, 8)

    await this._repository.create({
      name,
      email,
      password: hashedPassword,
      driver_license
    })
  }
}

export { CreateUserUseCase }