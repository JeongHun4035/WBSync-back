import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

async createUser(dto: CreateUserDto): Promise<User> {
  const user = this.userRepository.create(dto)
  return this.userRepository.save(user)
}

  findAll() {
    return this.userRepository.find();
  }
}
