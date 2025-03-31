import { Controller, Get, Query } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Controller("management")
export class ManagementController {
  constructor(private readonly userService: UserService) {}

  @Get("users")
  async getAllUsers(@Query("keyword") keyword?: string) {
    const users = keyword
      ? await this.userService.searchUsers(keyword)
      : await this.userService.findAll();

    const filteredUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      dept: user.dept,
      deptCode: user.deptCode,
      rank: user.rank,
      rankCode: user.rankCode,
    }));

    return {
      totalCount: filteredUsers.length,
      dataList: filteredUsers,
    };
  }
}
