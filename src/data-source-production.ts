import { DataSource } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { Project } from './entities/project.entity';
import { Tag } from './entities/tag';
import { Subscription } from './entities/subscription.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'dpg-cpl25dud3nmc73ddtv40-a',
  database: 'guessby',
  port: 5432,
  username: 'guessby_user',
  password: 'xYC0KD0o5TWznzqsiBIhAzzKLEmPrDmh',
  synchronize: false,
  entities: [User, Profile, Project, Tag, Subscription],
  migrations: ['src/migrations/*{.ts,.js}'],
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default dataSource;
