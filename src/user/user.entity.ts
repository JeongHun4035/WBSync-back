import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  key: number;

  @Column()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  recheckPassword: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  dept: string;

  @Column({ nullable: true })
  deptCode: string;

  @Column({ nullable: true })
  rank: string;

  @Column({ nullable: true })
  rankCode: string;

  @Column()
  phoneNumber: string;
}
