import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AxiosError, AxiosResponse } from 'axios';
import { Cache } from 'cache-manager';
import { catchError, firstValueFrom } from 'rxjs';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async findCompany(id: string): Promise<any> {
    const cachedData = await this.cacheService.get<{ name: string }>(
      id.toString(),
    );
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }

    const { data } = await firstValueFrom(
      this.httpService.get(`http://localhost:3001/companies/${id}`).pipe(
        catchError((error: AxiosError) => {
          throw 'An error happened!';
        }),
      ),
    );

    await this.cacheService.set(id.toString(), data);
    return data;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
