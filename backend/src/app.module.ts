import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({isGlobal: true, envFilePath: '../.env'}), 
    UsersModule, 
    AuthModule, 
    DatabaseModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
