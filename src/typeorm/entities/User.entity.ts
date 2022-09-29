import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}