import {
  CacheInterceptor,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Param,
  UseInterceptors
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Company } from './company.entity';
import { CompaniesService } from './company.service';

const CACHE_KEY_FILTERED_LIST = 'companiesFilteredList';

@Controller('companies')
@UseInterceptors(CacheInterceptor)
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async findAll(): Promise<Company[]> {
    console.log('CACHE MISS');

    const companiesList = await this.companiesService.findAll();

    const tempList = [...companiesList].map((company) => {
      company.active = Math.random() > 0.5 ? true : false;
      return company;
    });

    tempList.forEach((item) => {
      item.active = !item.active;
    });

    const companiesFilteredList = [...tempList].filter(
      (company) => company.active,
    );
    return companiesFilteredList;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companiesService.findOne(id);
  }
}
