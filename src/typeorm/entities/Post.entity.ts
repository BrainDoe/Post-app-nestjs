import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';

export enum UserRole {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = "admin",
  SUPERADMIN = "superadmin'",
  EDITOR = "editor"
}

@Entity({ name: 'posts'})
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  image: string;

  @Column()
  comment: string;

  @Column()
  isPublic: boolean;

  @ManyToOne(() => User)
  @JoinColumn()
  owner: User;
}