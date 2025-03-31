import { Module } from "@nestjs/common";
import { ManagementController } from "./management.controller";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [UserModule],
  controllers: [ManagementController],
})
export class ManagementModule {}
