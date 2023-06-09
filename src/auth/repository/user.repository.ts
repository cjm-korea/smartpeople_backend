import { Injectable, ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { DataSource, Repository } from "typeorm";
import { AuthCreadentialDto } from "../dto/auth.credential.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
    private logger = new Logger('Auth');
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialDto: AuthCreadentialDto): Promise<void> {
        const { userName, password, companyName, companyNumber, companyAddress, students } = authCredentialDto;
        const found = await this.findOne({ where: { companyName: companyName } });
        if (found) {
            this.logger.debug(`${userName} is confict!`, 'User');
            throw new ConflictException('같은 학원명이 존재합니다.');
        }

        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = this.create({ userName, password: hashPassword, companyName, companyNumber, companyAddress, students });
        this.logger.debug(`User ${userName} is signUp`);

        try {
            await this.save(user);
        } catch (error) {
            this.logger.debug(error.code, 'UserRepository');
            throw new InternalServerErrorException();
        }
    }


}