import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { ExtractJwt, Strategy } from "passport-jwt";

export const createJwtStrategy = (
  Class: new (...args: any[]) => any,
  jwtSecret: string,
) => {
  return class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtSecret,
      });
    }

    async validate(payload: any) {
      const user = plainToClass(Class, payload);
      const errors = validateSync(user);
      if (errors.length > 0) {
        throw new UnauthorizedException(new Error("Invalid Token"));
      }
      return user;
    }
  };
};
