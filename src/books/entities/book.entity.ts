import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  year: number;

  @Column()
  genre: string;

  @Column({ default: true  })
  isAvailable: boolean;
}
