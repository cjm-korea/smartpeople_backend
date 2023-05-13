import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { Student } from "src/entities/student.entity";
import { DataSource, Repository } from "typeorm";
import { StudentDto } from "../dto/student.dto";
import { User } from "src/entities/user.entity";
import { CheckDto } from "../dto/check.dto";
import 'dotenv/config'
import * as CryptoJS from "crypto-js";
import fetch from 'node-fetch';


@Injectable()
export class StudentRepository extends Repository<Student> {
    private logger = new Logger();

    constructor(private dataSource: DataSource) {
        super(Student, dataSource.createEntityManager());
    }

    async goTo(checkDto: CheckDto): Promise<void> {
        // Find student Data
        const data = await this.getStudentBymyNumber(checkDto.myNumber)
        this.logger.debug(data.parentNumber, `${data.userName}이 ${checkDto.companyName}에 등원했습니다.`, 'student Repository')
        // Naver SENS service for sms sending
        if (data) {
            this.sendSMS(data.parentNumber, `${data.userName}이 ${checkDto.companyName}에 등원했습니다.`)
        }else{
            new NotFoundException(`Can't find ${checkDto.myNumber} in Dataset`)
        }
    }

    // Depend on goTo
    async sendSMS(phoneNumber: string, message: string) {
        const accessKey: string = process.env.NCLOUD_ACCESSKEY;
        const secretKey: string = process.env.NCLOUD_SECRETKEY;
        var timeStamp: string = Date.now().toString();
        this.logger.debug(`${accessKey} + ${secretKey} + ${timeStamp}`, 'StudentRepository');

        const signatureKey: string = this.makeSignature(accessKey, secretKey, timeStamp);

        var sendPhoneNumber = phoneNumber.replace(/-/g, '');
        this.logger.debug(`${sendPhoneNumber} is send to number`, 'StudentRepository');

        const sms = {
            "type": "SMS",
            "from": process.env.NCLOUD_SENDPHONENUMBER,
            "content": "학원톡톡의 알림 서비스입니다.",
            "messages": [
                {
                    "to": sendPhoneNumber,
                    "content": `${message}` 
                }
            ],
        }

        const serviceId: string = process.env.NCLOUD_SERVICEID;
        const SENSURL: string = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
        const res = await fetch(SENSURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'x-ncp-apigw-timestamp': timeStamp,
                'x-ncp-iam-access-key': process.env.NCLOUD_ACCESSKEY,
                'x-ncp-apigw-signature-v2': signatureKey
            },
            body: JSON.stringify(sms)
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    // Depend on goTo
    makeSignature(accesssKey: string, secretKey: string, timeStamp: string): string {
        var space = " ";				// one space
        var newLine = "\n";				// new line
        var method = "POST";			// method
        var serviceId = process.env.NCLOUD_SERVICEID;
        var url = `/sms/v2/services/${serviceId}/messages`;	        // url (include query string)
        var timestamp = timeStamp;		// current timestamp (epoch)
        var accessKey = accesssKey;		// access key id (from portal or Sub Account)
        var secretKey = secretKey;		// secret key (from portal or Sub Account)

        var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
        hmac.update(method);
        hmac.update(space);
        hmac.update(url);
        hmac.update(newLine);
        hmac.update(timestamp);
        hmac.update(newLine);
        hmac.update(accessKey);

        var hash = hmac.finalize();

        var signatureKey: string = hash.toString(CryptoJS.enc.Base64)

        this.logger.debug(`${signatureKey}`, 'student Repository');
        return signatureKey;
    }

    // Make CRUD for Student
    async getStudentByuserName(userName: string): Promise<StudentDto> {
        const found = await this.findOne({ where: { userName: userName } });
        if (!found) {
            throw new NotFoundException(`Can't find in Dataset ${userName}`);
        }
        return found;
    }

    async getStudentBymyNumber(myNumber: string): Promise<StudentDto> {
        const found = await this.findOne({ where: { myNumber: myNumber } });
        if (!found) {
            throw new NotFoundException(`Can't find in Dataset ${myNumber}`);
        }
        return found;
    }

    async createStudent(studentDto: StudentDto, user: User): Promise<string> {
        const { userName, myNumber, parentNumber } = studentDto;
        const newStudent = this.create({ userName, myNumber, parentNumber, user });
        this.logger.debug(`New ${userName} is registed to ${myNumber} with ${parentNumber}`);

        try {
            await this.save(newStudent);
            return 'Student registed!';
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException;
        }
    };

    async getAllStudents(): Promise<Student[]> {
        const allStudents = await this.find()
        // Check dataset
        return allStudents;
    };

    async updateStudent(userName: string, parentNumber: string): Promise<StudentDto> {
        console.log(userName);
        console.log(parentNumber);
        const student = await this.getStudentByuserName(userName);
        student.parentNumber = parentNumber;
        try {
            await this.save(student);
        } catch (error) {
            this.logger.debug(`${userName} update is failed!`, 'Student-regist Reposiotry');
            console.log(error.code);
        }
        return student;
    };

    // Check this function
    async deleteStudent(userName: string, myNumber: string): Promise<void> {
        const student = await this.getStudentBymyNumber(myNumber);

        try {
            await this.delete(student);
        } catch (error) {
            this.logger.debug(`${userName} delete is failed!`, 'Student-regist Reposiotry');
            console.log(error.code);
        }
    };
}