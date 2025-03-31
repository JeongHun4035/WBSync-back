import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuService } from "./menu.service";
import { MenuController } from "./menu.controller";
import { Menu } from "./entities/menu.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu]), // Menu 엔티티와 Repository를 MenuModule에 등록
  ],
  providers: [MenuService],
  controllers: [MenuController],
})
export class MenuModule { }
