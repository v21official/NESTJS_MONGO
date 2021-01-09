import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Link, LinkDocument } from './schema/link.schema';
import { History, HistoryDocument } from './schema/history.schema';
import { CreateLinkDto } from './link.dto';

@Injectable()
export class LinkService {
    constructor(
        @InjectModel(Link.name) private readonly linkModel: Model<LinkDocument>,
        @InjectModel(History.name) private readonly historyModel: Model<HistoryDocument>,
    ) { }

    async create(req: any, createLinkDto: CreateLinkDto): Promise<any> {
        if (!createLinkDto.original) throw new BadRequestException('Vui long nhap link can rut gon');
        let alias = '';
        if (createLinkDto.alias) {
            // if (createLinkDto.alias.length > 8) throw new BadRequestException('Phan rut gon khong duoc dai qua 8 ki tu');
            alias = createLinkDto.alias;
            const checkExistAlias = await this.findLinkByAlias(alias);
            if (checkExistAlias) throw new BadRequestException('Phan rut gon da ton tai. Vui long nhap lai');
        } else {
            alias = this.randomAlias(8);
            let checkExistAlias = await this.findLinkByAlias(alias);
            while (checkExistAlias) {
                alias = this.randomAlias(8);
                checkExistAlias = await this.findLinkByAlias(alias);
            }
        }
        // const shortenLink = `https://inet.vn/${alias}`;
        const shortenLink = `http://localhost:3000/${alias}`;
        const createdLink = new this.linkModel({
            original: createLinkDto.original,
            alias,
            shortenLink,
            username: req.user.username
        });
        return createdLink.save();
    }

    async findAllByUsername(username: string): Promise<Link[]> {
        const data = await this.linkModel.find({ username, isDeleted: false }).exec();
        return data;
    }

    async findLinkByAlias(alias: string): Promise<Link> {
        return await this.linkModel.findOne({ alias, isDeleted: false });
    }

    randomAlias(length: number) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    async delete(req: any, alias: string): Promise<any> {
        const findLink = await this.linkModel.findOne({ alias, username: req.user.username, isDeleted: false });
        if (!findLink) throw new NotFoundException('Khong tim thay link can xoa');
        return await this.linkModel.findByIdAndUpdate(
            { _id: findLink.id },
            { isDeleted: true },
            { new: true, useFindAndModify: false }
        )
    }

    async redirect(alias: string, ip: string): Promise<any> {
        const findLink = await this.linkModel.findOne({ alias, isDeleted: false });
        if (!findLink) return 'https://inet.vn/not-found';
        const createdHistory = new this.historyModel({
            accessIP: ip,
            alias,
            accessTime: Date.now()
        });
        await createdHistory.save();
        return findLink.original;
    }

    async accessCountLinkByAlias(alias: string): Promise<number> {
        return await this.historyModel.countDocuments({ alias });
    }
}
