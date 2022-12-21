import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly httpService: HttpService,
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
    const { data } = await firstValueFrom(
      this.httpService.get(`http://localhost:3001/companies/${id}`).pipe(
        catchError((error: AxiosError) => {
          throw 'An error happened!';
        }),
      ),
    );

    return data;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
