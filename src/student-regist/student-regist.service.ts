import { Injectable } from '@nestjs/common';
import { StudentRepository } from './repository/student.repository';
import { StudentDto } from './dto/student.dto';

@Injectable()
export class StudentRegistService {
    constructor(
        private studentRepository: StudentRepository
    ) { }

    async getStudentByUserName(userName: string): Promise<StudentDto> {
        return this.studentRepository.getStudentByuserName(userName);
    }

    async createStudent(studentDto: StudentDto): Promise<void> {
        return this.studentRepository.createStudent(studentDto);
    }

    async getAllStudents(): Promise<StudentDto[]> {
        return this.studentRepository.getAllStudents();
    }

    async updateStudent(userName: string, parentNumber: string): Promise<StudentDto> {
        return this.updateStudent(userName, parentNumber);
    }

    async deleteStudent(userName: string): Promise<void> {
        return this.studentRepository.deleteStudent(userName);
    }
}
