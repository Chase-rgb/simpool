import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<object | null> {
    const dbUser = await this.usersService.findByEmail(email);
    if (dbUser && bcryptjs.compareSync(pass, dbUser.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = dbUser;
      return result;
    }
    return null;
  }
}
