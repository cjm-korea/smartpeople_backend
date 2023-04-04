import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { StudentRegistService } from './student-regist.service';
import { StudentDto } from './dto/student.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/entities/user.entity';

@Controller('student')
export class StudentRegistController {
    constructor(private studentRegistService: StudentRegistService) { }
    // Make validation with JWT token
    @Get('/:userName')
    getStudentByUserName(@Param('userName') userName: string): Promise<StudentDto> {
        return this.studentRegistService.getStudentByUserName(userName);
    }

    @Post('/regist')
    createStudentByUserName(
        @Body() studentDto: StudentDto,
        @GetUser() user: User
    ): Promise<void> {
        return this.studentRegistService.createStudent(studentDto, user);
    }

    @Get()
    getAllStudents(): Promise<StudentDto[]> {
        return this.studentRegistService.getAllStudents();
    }

    @Patch()
    updateStudent(@Body() userName: string, parentNumber: string): Promise<StudentDto> {
        return this.studentRegistService.updateStudent(userName, parentNumber);
    }

    @Delete()
    deleteStudent(@Body() userName: string): Promise<void> {
        return this.studentRegistService.deleteStudent(userName);
    }

}
