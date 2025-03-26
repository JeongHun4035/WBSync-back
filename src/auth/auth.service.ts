import { Injectable } from '@nestjs/common'
import { SignUpDto } from './dto/signup.dto'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(dto: SignUpDto) {
    return this.userService.createUser(dto)
  }
}