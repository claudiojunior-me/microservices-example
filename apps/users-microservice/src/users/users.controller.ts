import { CACHE_MANAGER, Controller, Get, Inject, Param } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    const cachedUser = await this.cacheManager.get(`get_user_list`);
    if (cachedUser) {
      return cachedUser as User[];
    }

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

    const mappedList = await Promise.all(
      filteredList.map(async (item) => {
        item.company = null;

        try {
          item.company = await this.usersService.findCompany('5');
        } catch (err) {
          console.error(err);
        }

        return item;
      }),
    );

    this.cacheManager.set(`get_user_list`, mappedList);
    return mappedList;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const cachedUser = await this.cacheManager.get(`get_user_${id}`);
    if (cachedUser) {
      return cachedUser as User;
    }

    const userData = await this.usersService.findOne(id);
    this.cacheManager.set(`get_user_${id}`, userData);
    return userData;
  }
}
