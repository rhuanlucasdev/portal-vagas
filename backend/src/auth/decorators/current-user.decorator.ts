import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type AuthUserPayload = {
  userId: string;
  email: string;
};

/**
 * Lê o user que o JwtStrategy colocou em req.user após validar o token.
 * Evita tipar @Req() na mão em toda rota protegida.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUserPayload => {
    const request = ctx.switchToHttp().getRequest<{ user: AuthUserPayload }>();
    return request.user;
  },
);
