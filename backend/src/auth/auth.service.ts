import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<object | null> {
    const dbUser = await this.usersService.findByEmail(email);
    if (!dbUser) {
      throw new UnauthorizedException('User not found');
    } else if (!bcryptjs.compareSync(pass, dbUser.password)) {
      throw new UnauthorizedException('Invalid password');
    } else {
      const payload = {
        sub: dbUser.id,
        username: dbUser.username,
        email: dbUser.email,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }
}
