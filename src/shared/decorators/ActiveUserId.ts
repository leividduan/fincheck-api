import { UnauthorizedException, createParamDecorator } from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined>((data, context) => {
  const request = context.switchToHttp().getRequest();
  const userId = request.userId;

  if (!userId) {
    throw new UnauthorizedException();
  }

  return userId;
});
