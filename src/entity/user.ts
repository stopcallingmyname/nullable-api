import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from './profile';

export enum Role {
  Admin = 'Admin',
  User = 'User',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  username: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;
  @Column({ default: Role.User, length: 50, nullable: false, enum: Role })
  role: Role;
  @OneToOne(() => Profile, (profile) => profile.user, { onDelete: 'CASCADE' })
  @JoinColumn()
  profile: Profile;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registration_date: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
