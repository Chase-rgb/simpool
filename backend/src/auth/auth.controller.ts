import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { inspect } from 'util';
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    try {
      const userToken = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      return userToken;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Invalid username or password');
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('jwtProfile')
  async getProfile(@Request() req) {
    return inspect(req.user, { depth: null });
  }
}
