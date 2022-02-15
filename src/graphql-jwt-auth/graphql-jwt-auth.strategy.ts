import { Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { ExtractJwt, Strategy } from "passport-jwt";
import {
  GraphqlJwtAuthPassportOptions,
  GRAPHQL_JWT_AUTH_MODULE_OPTIONS,
} from "./interfaces";

export class GraphqlJwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(GRAPHQL_JWT_AUTH_MODULE_OPTIONS)
    private options: GraphqlJwtAuthPassportOptions,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: options.jwtSecret,
    });
  }

  async validate(payload: any) {
    const user = plainToClass(this.options.Class, payload);
    const errors = validateSync(user);
    if (errors.length > 0) {
      throw new UnauthorizedException(new Error("Invalid Token"));
    }
    return user;
  }
}
