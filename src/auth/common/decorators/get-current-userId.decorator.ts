import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCurrentUserId = createParamDecorator(
    (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    // console.log(request.user);
    return request.user['sub']
  },
)