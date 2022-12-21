import { Controller, Get, Param } from '@nestjs/common';
import { Company } from './company.entity';
import { CompaniesService } from './company.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async findAll(): Promise<Company[]> {
    const companiesList = await this.companiesService.findAll();

    const tempList = [...companiesList].map((company) => {
      company.active = Math.random() > 0.5 ? true : false;
      return company;
    });

    tempList.forEach((item) => {
      item.active = !item.active;
    });

    return [...tempList].filter((company) => company.active);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companiesService.findOne(id);
  }
}
