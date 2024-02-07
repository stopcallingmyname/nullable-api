import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user';
import { Project } from './project';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  user: User;
  @Column({ length: 255, nullable: true })
  name: string;
  @Column({ length: 255, nullable: true })
  surname: string;
  @Column({ type: 'text', nullable: true })
  bio: string;
  @OneToMany(() => Project, (project) => project.profile, { cascade: true })
  projects: Project[];
  @Column({ length: 255, nullable: true })
  social_links: string;
  @Column({ length: 255, nullable: true })
  portfolio_url: string;
  @Column({ length: 255, nullable: true })
  avatar_url: string;
}
