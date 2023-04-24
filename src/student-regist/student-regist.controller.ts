import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { StudentRegistService } from './student-regist.service';
import { StudentDto } from './dto/student.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('student')
export class StudentRegistController {
    constructor(private studentRegistService: StudentRegistService) { }
    private logger = new Logger();
    // Testing APIs need

    // @Get('/:userName')
    // @UseGuards(AuthGuard())
    // getStudentByUserName(@Param('userName') userName: string): Promise<StudentDto> {
    //     return this.studentRegistService.getStudentByUserName(userName);
    // }

    @Post('/goTo')
    goTo(
        @Body() {
            companyName,
            myNumber
        }
    ): Promise<void> {
        return this.studentRegistService.goTo(companyName, myNumber)
    }

    @Post('/regist')
    @UseGuards(AuthGuard())
    createStudent(
        @Body() studentDto: StudentDto,
        @GetUser() user: User
    ): Promise<string> {
        return this.studentRegistService.createStudent(studentDto, user);
    }

    @Get()
    @UseGuards(AuthGuard())
    getAllStudents(): Promise<StudentDto[]> {
        return this.studentRegistService.getAllStudents();
    }

    @Patch()
    @UseGuards(AuthGuard())
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
    @UseGuards(AuthGuard())
    deleteStudent(
        @Body()
        {
            userName,
            myNumber
        }
    ): Promise<void> {
        return this.studentRegistService.deleteStudent(userName, myNumber);
    }

    @Get('/:companyName')
    test(@Param() params: any): string {
        this.logger.debug(`${params.companyName}`, 'student');
        return `${params}`;
    }

}
