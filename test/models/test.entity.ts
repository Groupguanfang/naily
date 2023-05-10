import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Test")
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;
}
