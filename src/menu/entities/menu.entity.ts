import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  menuId: number;

  @Column()
  menuName: string; // 메뉴명

  @Column()
  menuPath: string; // 이동할 URL

  @Column({ nullable: true })
  parentId?: number; // 부모 메뉴 ID (없으면 최상위 메뉴)

  @Column({ default: 0 })
  order: number; // 메뉴 정렬 순서

  @Column({ default: true })
  isActive: boolean; // 메뉴 활성화 여부
}
