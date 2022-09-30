import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post.entity';

export enum UserRole {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = "admin",
  SUPERADMIN = "superadmin'",
  EDITOR = "editor"
}

@Entity({ name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  hashedRt: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole

  @OneToMany(() => Post, (post) => post.owner, {cascade: true})
  @JoinColumn()
  owner: Post[]
}