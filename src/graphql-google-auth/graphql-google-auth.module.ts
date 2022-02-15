import { DynamicModule, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { GraphqlGoogleAuthStrategy } from "..";
import {
  GraphqlGoogleAuthPassportAsyncOptions,
  GraphqlGoogleAuthPassportOptions,
  GRAPHQL_GOOGLE_AUTH_MODULE_OPTIONS,
} from "./interfaces";

@Module({})
export class GraphqlGoogleAuthModule {
  static register(options: GraphqlGoogleAuthPassportOptions): DynamicModule {
    const optionProvider = {
      provide: GRAPHQL_GOOGLE_AUTH_MODULE_OPTIONS,
      useValue: options,
    };
    return {
      module: GraphqlGoogleAuthModule,
      imports: [
        PassportModule.register({
          defaultStrategy: "jwt",
          property: "user",
          session: false,
        }),
      ],
      providers: [optionProvider, GraphqlGoogleAuthStrategy],
    };
  }

  static registerAsync(
    options: GraphqlGoogleAuthPassportAsyncOptions,
  ): DynamicModule {
    const optionProvider = {
      provide: GRAPHQL_GOOGLE_AUTH_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject,
    };
    return {
      module: GraphqlGoogleAuthModule,
      imports: [
        PassportModule.register({
          defaultStrategy: "jwt",
          property: "user",
          session: false,
        }),
        ...(options.imports ?? []),
      ],
      exports: [GRAPHQL_GOOGLE_AUTH_MODULE_OPTIONS],
      providers: [optionProvider, GraphqlGoogleAuthStrategy],
    };
  }
}
