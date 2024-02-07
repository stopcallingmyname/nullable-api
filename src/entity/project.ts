import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Profile } from './profile';
import { Tag } from './tag';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 255, nullable: false })
  title: string;
  @Column('text')
  description: string;
  @ManyToOne(() => Profile, (profile) => profile.projects)
  profile: Profile;
  @Column('jsonb', { nullable: false })
  components: any[];
  @ManyToMany(() => Tag, { nullable: true })
  @JoinTable()
  tags: Tag[];
  //   @Column('jsonb', { nullable: true })
  //   comments: any[];
  @Column({ default: 0 })
  likes: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
