import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User]), HttpModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
