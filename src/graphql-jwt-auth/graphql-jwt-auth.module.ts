import { DynamicModule, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { GraphqlJwtAuthStrategy } from "..";
import {
  GraphqlJwtAuthPassportAsyncOptions,
  GraphqlJwtAuthPassportOptions,
  GRAPHQL_JWT_AUTH_MODULE_OPTIONS,
} from "./interfaces";

@Module({})
export class GraphqlJwtAuthModule {
  static register(options: GraphqlJwtAuthPassportOptions): DynamicModule {
    const optionProvider = {
      provide: GRAPHQL_JWT_AUTH_MODULE_OPTIONS,
      useValue: options,
    };
    return {
      module: GraphqlJwtAuthModule,
      imports: [
        PassportModule.register({
          defaultStrategy: "jwt",
          property: "user",
          session: false,
        }),
      ],
      providers: [optionProvider, GraphqlJwtAuthStrategy],
    };
  }

  static registerAsync(
    options: GraphqlJwtAuthPassportAsyncOptions,
  ): DynamicModule {
    const optionProvider = {
      provide: GRAPHQL_JWT_AUTH_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject,
    };
    return {
      module: GraphqlJwtAuthModule,
      imports: [
        PassportModule.register({
          defaultStrategy: "jwt",
          property: "user",
          session: false,
        }),
        ...(options.imports ?? []),
      ],
      exports: [GRAPHQL_JWT_AUTH_MODULE_OPTIONS],
      providers: [optionProvider, GraphqlJwtAuthStrategy],
    };
  }
}
