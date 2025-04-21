import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User | null> {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return newUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post('clearUsers')
  async clearUsers(): Promise<void> {
    await this.userService.clearUsers();
  }

  @Get('getAllUsers')
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userService.getAllUsers();
      return users;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }


}
