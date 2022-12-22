import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
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
      // getCompanyData(user.id);
      return user;
    });

    tempList.forEach((item) => {
      item.active = !item.active;
    });

    const filteredList = [...tempList].filter((user) => user.active);

    return await Promise.all(
      filteredList.map(async (item) => {
        item.company = null;

        try {
          item.company = await this.usersService.findCompany(item.id);
        } catch (err) {
          console.error(err);
        }

        return item;
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
}
