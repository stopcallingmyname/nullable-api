import { DataSource } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { Project } from './entities/project.entity';
import { Tag } from './entities/tag';
import { Subscription } from './entities/subscription.entity';
import { EnvVariable } from './enum/env-variable.enum';

const dataSource = new DataSource({
  type: process.env[EnvVariable.DataBaseType] as 'postgres',
  host: process.env[EnvVariable.DataBaseHost],
  port: Number(process.env[EnvVariable.DataBasePort]),
  username: process.env[EnvVariable.DataBaseUserName],
  password: process.env[EnvVariable.DataBasePassword],
  database: process.env[EnvVariable.DataBaseName],
  synchronize: process.env[EnvVariable.IsDataBaseSynchronize] === 'true',
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
