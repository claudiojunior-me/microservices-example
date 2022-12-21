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

    const getCompanyData = async (
      id: string,
    ): Promise<AxiosResponse<any, any>> => {
      const response = await axios.get(`http://localhost:3001/companies/${id}`);
      return response;
    };

    const tempList = [...usersList].map((user) => {
      user.active = Math.random() > 0.5 ? true : false;
      // getCompanyData(user.id);
      return user;
    });

    tempList.forEach((item) => {
      item.active = !item.active;
    });

    return [...tempList]
      .filter((user) => user.active)
      .map((item) => {
        // getCompanyData(item.id);
        return item;
      });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
}
