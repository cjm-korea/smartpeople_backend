import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('student')
export class StudentRegistController {
    // Make validation with JWT token
    @Get('/:userName')
    getStudentByUserName()

    @Post('/regist')
    getStudentByUserName()

    @Get()
    getAllStudents()

    @Patch()
    updateStudent()

    @Delete()
    deleteStudent()

}
