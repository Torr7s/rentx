import { getRepository, Repository } from 'typeorm';

import { UserEntity } from '@modules/users/infra/typeorm/entities/UserEntity';
import { IUsersRepository } from '@modules/users/domain/repositories/UsersInterface';
import { ICreateUserDto } from '@modules/users/domain/dtos/CreateUserDto';

class UsersRepository implements IUsersRepository {
  private _usersRepository: Repository<UserEntity>

  constructor() {
    this._usersRepository = getRepository(UserEntity)
  }

  async create({
    name,
    email,
    password,
    driver_license
  }: ICreateUserDto): Promise<void> {
    const newUserData: UserEntity = this._usersRepository.create({
      name,
      email,
      password,
      driver_license
    })

    await this._usersRepository.save(newUserData)
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const userData: UserEntity = await this._usersRepository.findOne({ email })

    return userData
  }

  async findById(id: string): Promise<UserEntity> {
    const userData: UserEntity = await this._usersRepository.findOne(id)

    return userData
  }

  async updateAvatar(id: string, avatar_file: string): Promise<UserEntity> {
    const userData: UserEntity = await this.findById(id)
    
    userData.avatar = avatar_file

    await this._usersRepository.save(userData)

    return userData
  }
}

export { UsersRepository }