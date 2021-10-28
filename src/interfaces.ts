export interface GraphqlJwtAuthPassportOptions {
  Class: new (...args: any[]) => any;
  jwtSecret: string;
}

export interface GraphqlJwtAuthPassportAsyncOptions {
  useFactory: (
    ...args: any[]
  ) => Promise<GraphqlJwtAuthPassportOptions> | GraphqlJwtAuthPassportOptions;
  inject?: any[];
}

export const GRAPHQL_JWT_AUTH_MODULE_OPTIONS =
  "GRAPHQL_JWT_AUTH_MODULE_OPTIONS";
