import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";

@Controller("menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Get()
  async getAll() {
    return this.menuService.findAll();
  }

  @Get(":menuId")
  async getOne(@Param("menuId") menuId: number) {
    return this.menuService.findOne(menuId);
  }

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Put(":menuId")
  async update(@Param("menuId") menuId: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(menuId, updateMenuDto);
  }

  @Delete(":menuId")
  async delete(@Param("menuId") menuId: number) {
    return this.menuService.remove(menuId);
  }
}
