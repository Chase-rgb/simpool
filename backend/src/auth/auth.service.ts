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

  /**
   * Validates a user by checking their email and password.
   * If the user is found and the password matches, it returns an access token.
   * If the user is not found or the password is incorrect, it throws an UnauthorizedException.
   *
   * @param email - The email of the user to validate.
   * @param pass - The password of the user to validate.
   * @returns An object containing the access token if validation is successful.
   */
  async validateUser(email: string, pass: string): Promise<object | null> {
    const dbUser = await this.usersService.findByEmail(email);
    if (!dbUser) {
      throw new UnauthorizedException('User not found');
    } else if (!bcryptjs.compareSync(pass, dbUser.password)) {
      throw new UnauthorizedException('Invalid password');
    } else {
      const payload = {
        user_id: dbUser.user_id,
        username: dbUser.username,
        email: dbUser.email,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }
}
