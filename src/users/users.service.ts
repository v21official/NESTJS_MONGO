import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, ChangePasswordDto } from './users.dto';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) { }

    async findAll(): Promise<User[]> {
        const data = await this.userModel.find({ isDeleted: false }).exec();
        return data;
    }

    async findByUsername({ username }): Promise<User> {
        return await this.userModel.findOne({ username, isDeleted: false });
    }

    async register(createUserDto: CreateUserDto): Promise<User> {
        const checkUsername = await this.userModel.findOne({ username: createUserDto.username, isDeleted: false });
        if (checkUsername)
            // throw new HttpException('username already', HttpStatus.BAD_REQUEST);
            throw new BadRequestException('username already');
        const passwordHash = bcrypt.hashSync(createUserDto.password, 10);
        const createdUser = new this.userModel({
            username: createUserDto.username,
            password: passwordHash,
            name: createUserDto.name
        });
        return await createdUser.save();
    }

    async changePassword(user: any, changePasswordDto: ChangePasswordDto): Promise<any> {
        const findUser = await this.userModel.findOne({ username: user.username, isDeleted: false });
        const comparePassword = await bcrypt.compareSync(
            changePasswordDto.password,
            findUser.password,
            (err: any, res: any) => {
                return res
            })
        if (!comparePassword) throw new BadRequestException('confirm password incorrect');
        const passwordHash = bcrypt.hashSync(changePasswordDto.newPassword, 10);
        await this.userModel.findByIdAndUpdate(
            { _id: user.id },
            { password: passwordHash },
            { new: true, useFindAndModify: false }
        )
        return 'password updated successfully';
    }
}
