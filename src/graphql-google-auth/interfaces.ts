import { ModuleMetadata } from "@nestjs/common";

export interface GraphqlGoogleAuthPassportOptions {
  Class: new (...args: any[]) => any;
  requestPerMinute?: number;
}

export interface GraphqlGoogleAuthPassportAsyncOptions extends ModuleMetadata {
  useFactory: (
    ...args: any[]
  ) =>
    | Promise<GraphqlGoogleAuthPassportOptions>
    | GraphqlGoogleAuthPassportOptions;
  inject?: any[];
}

export const GRAPHQL_GOOGLE_AUTH_MODULE_OPTIONS =
  "GRAPHQL_GOOGLE_AUTH_MODULE_OPTIONS";
