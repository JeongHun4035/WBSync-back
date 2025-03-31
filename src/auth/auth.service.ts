import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignUpDto } from "./dto/signup.dto";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/signin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignUpDto) {
    return this.userService.createUser(dto);
  }

  async signin(dto: LoginDto): Promise<{
    message: string;
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }> {
    const { id, password } = dto;
    const user = await this.userService.findById(id);

    if (!user) {
      throw new UnauthorizedException("존재하지 않는 아이디에요.");
    }

    if (user.password !== password) {
      throw new UnauthorizedException("비밀번호가 틀렸어요.");
    }

    const payload = {
      sub: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: "1h",
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: "7d",
    });

    await this.userService.updateRefreshToken(user.id, refreshToken);

    return {
      message: "로그인 성공",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
