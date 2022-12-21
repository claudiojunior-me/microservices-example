import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'COMPANIES', timestamps: false })
export class Company extends Model {
  @Column
  name: string;

  @Column
  industry: string;

  @Column
  email: string;

  @Column
  city: string;

  @Column
  coutry: string;

  active: boolean;
}
