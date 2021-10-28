import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { createJwtStrategy } from '.';

interface GraphqlJwtAuthOptions {
  Class: new (...args: any[]) => any;
  jwtSecret: string;
}

@Module({})
export class GraphqlJwtAuthModule {
  static register(options: GraphqlJwtAuthOptions): DynamicModule {
    return {
      module: GraphqlJwtAuthModule,
      imports: [
        JwtModule.register({
          secret: options.jwtSecret,
        }),
        PassportModule.register({
          defaultStrategy: 'jwt',
          property: 'user',
          session: false,
        }),
      ],
      providers: [createJwtStrategy(options.Class, options.jwtSecret)],
    };
  }
}
