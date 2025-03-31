import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async searchUsers(keyword: string): Promise<User[]> {
    return this.userRepository.find({
      where: [
        { id: Like(`%${keyword}%`) },
        { name: Like(`%${keyword}%`) },
        { email: Like(`%${keyword}%`) },
        { phoneNumber: Like(`%${keyword}%`) },
      ],
    });
  }

  async findById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async updateRefreshToken(id: string, token: string) {
    return this.userRepository.update({ id }, { refreshToken: token });
  }
}
