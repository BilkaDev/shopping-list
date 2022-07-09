import {Injectable} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {User} from "./user.entity";
import {RegisterUserResponse} from "../interfaces/user/user";

@Injectable()
export class UserService {
    async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
        const checkEmail = await User.findOne({where: {email: newUser.email}});
        if (!checkEmail && newUser.email.length > 0){
            const user = new User();
            user.email = newUser.email;
            await user.save();
            return user;
        } else {
            return {isSuccess:false, message: 'email is already in use'}
        }
    }
    async getOneUser(id: string): Promise<User> {
        return await User.findOne({where: {id}});
    }
}
