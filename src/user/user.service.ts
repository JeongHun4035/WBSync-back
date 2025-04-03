import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like, FindOptionsWhere  } from "typeorm";
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

 async searchUsers(
  keyword: string,
  deptCode?: string,
  rankCode?: string,
  currentPage = 1,
  pageLimit = 10,
): Promise<{ data: User[]; totalCount: number }> {
  const where: FindOptionsWhere<User>[] = [];

  if (keyword) {
    where.push(
      { id: Like(`%${keyword}%`) },
      { name: Like(`%${keyword}%`) },
      { email: Like(`%${keyword}%`) },
    );
  }

  const extraCondition: Partial<User> = {};
    if (deptCode) extraCondition.deptCode = deptCode;
    if (rankCode) extraCondition.rankCode = rankCode;

    if (Object.keys(extraCondition).length > 0) {
      if (where.length > 0) {
        for (let i = 0; i < where.length; i++) {
          where[i] = {
            ...where[i],
            ...extraCondition,
          };
        }
      } else {
        where.push(extraCondition as FindOptionsWhere<User>);
      }
    }

  const [result, total] = await this.userRepository.findAndCount({
    where,
    skip: (currentPage - 1) * pageLimit,
    take: pageLimit,
  });

  return { data: result, totalCount: total };
}

  async findById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async updateRefreshToken(id: string, token: string) {
    return this.userRepository.update({ id }, { refreshToken: token });
  }
}
