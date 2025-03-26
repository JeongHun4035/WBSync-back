import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signup.dto";
import { throwBadRequest } from "src/common/utils/http-exception.util";
import { LoginDto } from "./dto/signin.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  signup(@Body() dto: SignUpDto) {
    const { id, email, password, recheckPassword, name, phoneNumber } = dto;

    const idRegex = /^[a-zA-Z0-9_]{4,16}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{8,16}$/;
    const phoneRegex = /^\d{10,11}$/;

    if (!id || typeof id !== "string" || id.trim() === "") {
      throwBadRequest("ID를 입력해주세요.", "REQUIRED_ID");
    }

    if (!idRegex.test(id)) {
      throwBadRequest(
        "ID는 영문, 숫자, 언더바(_)로 구성해주세요.",
        "INVALID_ID_FORMAT",
      );
    }

    if (!password || typeof password !== "string" || password.trim() === "") {
      throwBadRequest("비밀번호를 입력해주세요.", "REQUIRED_PASSWORD");
    }

    if (!passwordRegex.test(password)) {
      throwBadRequest(
        "비밀번호는 특수문자 포함 8 ~ 16 자로 지정해주세요.",
        "INVALID_PASSWORD_FORMAT",
      );
    }

    if (
      !recheckPassword ||
      typeof recheckPassword !== "string" ||
      recheckPassword.trim() === ""
    ) {
      throwBadRequest(
        "비밀번호 재확인을 입력해주세요.",
        "REQUIRED_RECHECK_PASSWORD",
      );
    }

    if (recheckPassword !== password) {
      throwBadRequest(
        "비밀번호 재확인이 일치하지않습니다.",
        "NOT_CORRECT_PASSWORD",
      );
    }

    if (!name || typeof name !== "string" || name.trim() === "") {
      throwBadRequest("이름을 작성해주세요.", "REQUIRED_NAME");
    }

    if (!email || typeof email !== "string" || email.trim() === "") {
      throwBadRequest("이메일을 작성해주세요.", "REQUIRED_EMAIL");
    }

    if (!email || !emailRegex.test(email)) {
      throwBadRequest("이메일 형식이 잘못됐어요.", "INVALID_EMAIL_FORMAT");
    }

    if (
      !phoneNumber ||
      typeof phoneNumber !== "string" ||
      phoneNumber.trim() === ""
    ) {
      throwBadRequest("비상 연락망을 입력해주세요.", "REQUIRED_PHONE");
    }

    if (!phoneRegex.test(phoneNumber)) {
      throwBadRequest(
        "비상 연락망은 (-) 제외, 숫자만 입력해주세요.",
        "INVALID_PHONENUMBER_FORMAT",
      );
    }

    this.authService.signup(dto);
    return {
      message: "회원가입이 완료되었습니다.",
      statusCode: 200,
    };
  }

  @Post("sign-in")
  signin(@Body() dto: LoginDto) {
    const { id, password } = dto;
    if (!id || typeof id !== "string" || id.trim() === "") {
      throwBadRequest("아이디를 입력해주세요.", "REQUIRED_ID");
    }
    if (!password || typeof password !== "string" || password.trim() === "") {
      throwBadRequest("비밀번호를 입력해주세요.", "REQUIRED_PASSWORD");
    }
    return this.authService.signin(dto);
  }
}
