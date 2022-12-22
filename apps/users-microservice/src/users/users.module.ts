import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 150 * 1000,
      max: 5000,
    }),
    SequelizeModule.forFeature([User]),
    HttpModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
