import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompaniesController } from './company.controller';
import { Company } from './company.entity';
import { CompaniesService } from './company.service';

@Module({
  imports: [SequelizeModule.forFeature([Company])],
  providers: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
