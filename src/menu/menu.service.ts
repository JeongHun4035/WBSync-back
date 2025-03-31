import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Menu } from "./entities/menu.entity";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>
  ) { }

  async findAll(): Promise<Menu[]> {
    return await this.menuRepository.find({
      order: { order: "ASC" }, // 정렬 순서대로 반환
    });
  }
  async findOne(menuId: number): Promise<Menu> {
    const menu = await this.menuRepository.findOne({ where: { menuId } });
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${menuId} not found`);
    }
    return menu;
  }

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const menu = this.menuRepository.create(createMenuDto);
    return await this.menuRepository.save(menu);
  }

  async update(menuId: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    await this.menuRepository.update(menuId, updateMenuDto);
    return this.findOne(menuId);
  }

  async remove(menuId: number): Promise<void> {
    await this.menuRepository.delete(menuId);
  }
}
