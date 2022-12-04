import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'USERS', timestamps: false })
export class User extends Model {
  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  avatar: string;

  @Column
  email: string;

  @Column
  gender: string;

  @Column
  ip_address: string;

  @Column
  company: string;
}
