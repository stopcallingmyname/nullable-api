import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { EnvVariable } from '@app/enum/env-variable.enum';

export const getJWTConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => {
  return {
    secret: configService.get(EnvVariable.AccessTokenSecret),
    signOptions: {
      expiresIn: '15m',
    },
  };
};
