import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  BeforeUpdate,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Tag } from './tag';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  preview_url: string;

  @Column({ length: 255, nullable: false })
  title: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @ManyToOne(() => Profile, (profile) => profile.projects, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  creator: Profile;

  @Column('jsonb', { nullable: true })
  components: any[];

  @ManyToMany(() => Tag, { nullable: true })
  @JoinTable()
  tags: Tag[];

  @Column({ default: 0 })
  likes: number;

  @BeforeUpdate()
  updateLikes() {
    this.likes = this.likedBy.length;
  }

  @ManyToMany(() => Profile, (profile) => profile.likedProjects, {
    cascade: true,
    nullable: true,
  })
  @JoinTable({
    name: 'projects_likes',
    joinColumn: {
      name: 'projectId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'profileId',
      referencedColumnName: 'id',
    },
  })
  likedBy: Profile[];

  @Column({ default: 0 })
  views: number;

  @Column({ type: 'int', nullable: true })
  timeSpent: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
