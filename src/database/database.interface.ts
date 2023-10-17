import { PrismaClient } from '@prisma/client/scripts/default-index';

export interface IDataBase extends PrismaClient {
  init(): Promise<void>;
}
