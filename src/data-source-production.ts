import { DataSource } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { Project } from './entities/project.entity';
import { Tag } from './entities/tag';
import { Subscription } from './entities/subscription.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'dpg-crjueol2ng1s73fl3s9g-a',
  database: 'nullable_dev_tdct',
  port: 5432,
  username: 'stopcallingmyname',
  password: 'hc3Zb4JT0kmafezhT61eA147xBIe7A5t',
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
