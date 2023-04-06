import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { StudentRegistService } from './student-regist.service';
import { StudentDto } from './dto/student.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('student')
@UseGuards(AuthGuard())
export class StudentRegistController {
    constructor(private studentRegistService: StudentRegistService) { }

    // Testing APIs need

    @Get('/:userName')
    getStudentByUserName(@Param('userName') userName: string): Promise<StudentDto> {
        return this.studentRegistService.getStudentByUserName(userName);
    }

    @Post('/regist')
    createStudent(
        @Body() studentDto: StudentDto,
        @GetUser() user: User
    ): Promise<string> {
        return this.studentRegistService.createStudent(studentDto, user);
    }

    @Get()
    getAllStudents(): Promise<StudentDto[]> {
        return this.studentRegistService.getAllStudents();
    }

    @Patch()
    updateStudent(
        @Body()
        {
            userName,
            parentNumber
        }
    ): Promise<StudentDto> {
        return this.studentRegistService.updateStudent(userName, parentNumber);
    }

    @Delete()
    deleteStudent(
        @Body()
        {
            userName,
            myNumber
        }
    ): Promise<void> {
        return this.studentRegistService.deleteStudent(userName, myNumber);
    }

}
