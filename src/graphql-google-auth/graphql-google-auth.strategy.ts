import { Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { ExtractJwt, Strategy } from "passport-jwt";
import { passportJwtSecret } from "jwks-rsa";
import {
  GraphqlGoogleAuthPassportOptions,
  GRAPHQL_GOOGLE_AUTH_MODULE_OPTIONS,
} from "./interfaces";

export class GraphqlGoogleAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(GRAPHQL_GOOGLE_AUTH_MODULE_OPTIONS)
    private options: GraphqlGoogleAuthPassportOptions,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: options.requestPerMinute ?? 5,
        jwksUri: "https://www.googleapis.com/oauth2/v3/certs",
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: "https://accounts.google.com",
      algorithms: ["RS256"],
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
