import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'posts'})
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  isPublic: boolean;

  @ManyToOne(() => User)
  @JoinColumn()
  owner: User;
}