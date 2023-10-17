import { IDataBase } from 'database/database.interface';
import { PrismaClient } from '@prisma/client/scripts/default-index';

export class DatabaseService extends PrismaClient implements IDataBase {
  async init(): Promise<void> {
    await this.$connect();
  }
}
