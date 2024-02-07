import { ConfigModuleOptions } from '@nestjs/config';

export const MapModuleConfigOptions: ConfigModuleOptions = {
  isGlobal: true,

  envFilePath: `${process.cwd()}/.env`,
};
