import { Injectable } from '@nestjs/common';
import { StudentRepository } from './repository/student.repository';
import { StudentDto } from './dto/student.dto';
import { User } from 'src/entities/user.entity';
import { Student } from 'src/entities/student.entity';

@Injectable()
export class StudentRegistService {
    constructor(
        private studentRepository: StudentRepository
    ) { }

    async getStudentByUserName(userName: string): Promise<StudentDto> {
        return this.studentRepository.getStudentByuserName(userName);
    }

    async createStudent(studentDto: StudentDto, user: User): Promise<string> {
        return this.studentRepository.createStudent(studentDto, user);
    }

    async getAllStudents(): Promise<Student[]> {
        return this.studentRepository.getAllStudents();
    }

    async updateStudent(userName: string, parentNumber: string): Promise<StudentDto> {
        return this.studentRepository.updateStudent(userName, parentNumber);
    }

    async deleteStudent(userName: string, myNumber: string): Promise<void> {
        return this.studentRepository.deleteStudent(userName, myNumber);
    }
}
