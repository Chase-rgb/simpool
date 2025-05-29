import { ConflictException, Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { DataSource } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private dataSource: DataSource) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findByEmail(email: string): Promise<User | null> {
    if (email == null) {
      throw new Error('Email cannot be null');
    }
    const result = await this.dataSource.getRepository(User).findOne({
      where: { email },
    });
    return result;
  }

  async createUser(creatUserDto: CreateUserDto): Promise<User> {
    return this.dataSource.transaction(async (manager) => {
      const existingUser = await manager.findOne(User, {
        where: { email: creatUserDto.email },
      });
      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      const hashedPassword = await bcryptjs.hash(creatUserDto.password, 10);
      const newUser = manager.create(User, {
        username: creatUserDto.username,
        password: hashedPassword,
        email: creatUserDto.email,
      });
      const savedUser = await manager.save(newUser);
      return savedUser;
    });
  }

  async clearUsers(): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      await manager.delete(User, {}); // Delete all users
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.dataSource.getRepository(User).find();
  }
}
