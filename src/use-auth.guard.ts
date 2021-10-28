import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
  UseGuards,
} from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return super.canActivate(new ExecutionContextHost([req]));
  }
}

export const UseAuth = () => UseGuards(JwtAuthGuard);

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const { user } = GqlExecutionContext.create(context).getContext().req;
    return user;
  },
);
