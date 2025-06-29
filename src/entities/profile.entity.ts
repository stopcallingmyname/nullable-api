import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Subscription } from './subscription.entity';
import { Tag } from './tag';
@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registration_date: Date;

  @Column({ length: 255, nullable: true })
  full_name: string;

  @Column({ length: 255, nullable: true })
  location: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @ManyToMany(() => Tag, { nullable: true })
  @JoinTable()
  skills: Tag[];

  @OneToMany(() => Project, (project) => project.creator, { cascade: true })
  projects: Project[];

  @Column({ type: 'int', nullable: true })
  averageTimeSpent: number;

  @ManyToMany(() => Project, (project) => project.likedBy, {
    nullable: true,
  })
  likedProjects: Project[];

  @OneToMany(() => Subscription, (subscription) => subscription.follower, {
    onDelete: 'CASCADE',
  })
  following: Subscription[];

  @OneToMany(() => Subscription, (subscription) => subscription.followee, {
    onDelete: 'CASCADE',
  })
  followers: Subscription[];

  @Column({ length: 255, nullable: true })
  personal_website_url: string;

  @Column({ length: 255, nullable: true })
  avatar_url: string;

  @Column({ length: 255, nullable: true })
  twitter_url: string;

  @Column({ length: 255, nullable: true })
  facebook_url: string;

  @Column({ length: 255, nullable: true })
  instagram_url: string;

  @Column({ length: 255, nullable: true })
  github_url: string;

  @Column({ length: 255, nullable: true })
  behance_url: string;

  @Column({ length: 255, nullable: true })
  linkedIn_url: string;

  @Column({ length: 255, nullable: true })
  vimeo_url: string;

  @Column({ type: 'boolean', default: false })
  open_to_work: boolean;

  // @Column({ length: 10, nullable: true })
  // native_language: string;
}
