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
export class CreateLinkDto {
    @IsString()
    @IsNotEmpty()
    readonly original: string;

    @IsString()
    @MaxLength(8)
    readonly alias: string;
}
