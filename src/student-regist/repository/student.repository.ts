import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { Student } from "src/entities/student.entity";
import { DataSource, Repository } from "typeorm";
import { StudentDto } from "../dto/student.dto";
import { User } from "src/entities/user.entity";

@Injectable()
export class StudentRepository extends Repository<Student> {
    private logger = new Logger();
    constructor(private dataSource: DataSource) {
        super(Student, dataSource.createEntityManager());
    }
    // Make CRUD for Student

    async getStudentByuserName(userName: string): Promise<StudentDto> {
        const found = await this.findOne({ where: { userName: userName } });
        if (!found) {
            throw new NotFoundException(`Can't find in Dataset ${userName}`)
        }
        return found;
    }

    async createStudent(studentDto: StudentDto, user: User): Promise<string> {
        const { userName, myNumber, parentNumber} = studentDto;
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
        const student = await this.getStudentByuserName(userName);
        student.parentNumber = parentNumber;
        try {
            await this.save(student);
        } catch (error) {
            console.log(error.code);
        }
        return student;
    };

    // Check this function
    async deleteStudent(userName: string): Promise<void> {
        const student = await this.getStudentByuserName(userName);
        try {
            // await this.delete(student);
        } catch (error) {
            console.log(error.code);
        }
    };
}