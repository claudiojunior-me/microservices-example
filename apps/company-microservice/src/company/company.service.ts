import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company)
    private companyModel: typeof Company,
  ) {}

  findAll(): Promise<Company[]> {
    return this.companyModel.findAll();
  }

  findOne(id: string): Promise<Company> {
    return this.companyModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
