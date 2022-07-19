import {Body, Controller, Inject, Post} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import {UserService} from "./user.service";
import {RegisterUserResponse} from "../interfaces/user/user";

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private userService: UserService,
    ) {}

    @Post('/')
    register(
        @Body() newUser: RegisterDto,
    ):Promise<RegisterUserResponse>{
        return this.userService.register(newUser);
    }

}