import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ormconfig } from './ormconfig';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key.toUpperCase()] || this.env[key.toLowerCase()];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }
  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('APP_PORT', true);
  }

  public getTypeOrmConfig() {
    const config = ormconfig;
    // this fixes an issue with an error on startup not allowing imports outside a module
    config.migrations = ['src/migration/*.js'];
    return config as TypeOrmModuleOptions;
  }

  public getJwtConfig() {
    return {
      secret: this.getValue('JWT_SECRET'),
      signOptions: {
        expiresIn: this.getValue('JWT_EXPIRES_IN'),
      },
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([]);
export { configService };
