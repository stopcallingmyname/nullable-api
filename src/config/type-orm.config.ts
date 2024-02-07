import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { User } from '@app/entity/user';
import { EnvVariable } from '@app/enum/env-variable.enum';
import { Profile } from '@app/entity/profile';
import { Tag } from '@app/entity/tag';
import { Project } from '@app/entity/project';

export const typeOrmModuleAsyncOptions: TypeOrmModuleAsyncOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: configService.get<string>(EnvVariable.DataBaseType) as 'postgres',
    host: configService.get<string>(EnvVariable.DataBaseHost),
    port: configService.get<number>(EnvVariable.DataBasePort),
    username: configService.get<string>(EnvVariable.DataBaseUserName),
    password: configService.get<string>(EnvVariable.DataBasePassword),
    database: configService.get<string>(EnvVariable.DataBaseName),
    entities: [User, Profile, Project, Tag],
    synchronize: true,
  }),
  inject: [ConfigService],
};
