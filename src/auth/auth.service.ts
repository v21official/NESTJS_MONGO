import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername({ username });
        if (user) {
            const comparePassword = await bcrypt.compareSync(
                pass,
                user.password,
                (err, res) => {
                    return res
                })
            if (!comparePassword) return null;
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user._doc.username, id: user._doc._id, name: user._doc.name };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
