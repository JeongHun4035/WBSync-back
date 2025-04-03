import { Controller, Get, Query } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Controller("management")
export class ManagementController {
  constructor(private readonly userService: UserService) {}

  @Get("users")
  async getAllUsers(
    @Query("keyword") keyword?: string,
    @Query("deptCode") deptCode?: string,
    @Query("rankCode") rankCode?: string,
    @Query("currentPage") currentPage = 1,
    @Query("pageLimit") pageLimit = 10,
  ) {
    const { data, totalCount } = await this.userService.searchUsers(
      keyword ?? "",
      deptCode ?? "",
      rankCode ?? "",
      currentPage,
      pageLimit,
    );

    const filteredUsers = data.map(user => ({
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
      totalCount,
      dataList: filteredUsers,
    };
  }
}
