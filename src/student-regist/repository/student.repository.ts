import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { Student } from "src/entities/student.entity";
import { DataSource, Repository } from "typeorm";
import { StudentDto } from "../dto/student.dto";
import { User } from "src/entities/user.entity";
import { SNS } from 'aws-sdk';
import { CheckDto } from "../dto/check.dto";

@Injectable()
export class StudentRepository extends Repository<Student> {
    private logger = new Logger();
    private readonly sns = new SNS({
        region: 'ap-northeast-1'
    });
    
    constructor(private dataSource: DataSource) {
        super(Student, dataSource.createEntityManager());
    }

    async goTo(checkDto: CheckDto): Promise<void> {
        this.logger.debug(`${checkDto.companyName}'s student ${checkDto.myNumber} is goTo`)
        const data = await this.getStudentBymyNumber(checkDto.myNumber)
        // AWS SMS service
        this.logger.debug(data.parentNumber, `${data.userName}이 ${checkDto.companyName}에 등원했습니다.`, 'student Repository')
        // this.sendSMS(data.parentNumber, `${data.userName}이 ${checkDto.companyName}에 등원했습니다.`)
    }

    async sendSMS(phoneNumber: string, message: string){
        const msg = {
            Message: message,
            PhoneNumber: phoneNumber
        }
        return this.sns.publish(msg).promise()
    }

    // Make CRUD for Student
    async getStudentByuserName(userName: string): Promise<StudentDto> {
        console.log(userName);
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
            this.logger.debug(`${userName} update is failed!`,'Student-regist Reposiotry');
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
            this.logger.debug(`${userName} delete is failed!`,'Student-regist Reposiotry');
            console.log(error.code);
        }
    };
}