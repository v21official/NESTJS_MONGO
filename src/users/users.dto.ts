import {
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsDate,
    Min,
    Max,
    IsString,
    MaxLength,
    MinLength,
    IsNotEmpty,
} from 'class-validator';
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;
}

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly newPassword: string;
}

