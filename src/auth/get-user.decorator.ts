import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "src/entities/user.entity";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext):User => {
    // console.log(ctx);
    const req = ctx.switchToHttp().getRequest();
    // console.log(req.user);
    return req.user;
})