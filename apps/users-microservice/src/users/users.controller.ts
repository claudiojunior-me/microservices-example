import { Controller, Get, Param } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    const usersList = await this.usersService.findAll();

    const tempList = [...usersList].map((user) => {
      user.active = Math.random() > 0.5 ? true : false;
      return user;
    });

    tempList.forEach((item) => {
      item.active = !item.active;
    });

    return [...tempList].filter((user) => user.active);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
}
