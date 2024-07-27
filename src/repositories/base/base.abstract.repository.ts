import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsRelations,
  QueryRunner,
  Repository,
} from 'typeorm';

import { BaseInterfaceRepository } from '@app/repositories/base/base.interface.repository';
import { Base } from '@app/interfaces/base.interface';

export abstract class BaseAbstractRepository<T extends Base>
  implements BaseInterfaceRepository<T>
{
  private entity: Repository<T>;
  private queryRunner: QueryRunner | null = null;

  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data);
  }
  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return await this.entity.save(data);
  }
  public create(data: DeepPartial<T>): T {
    return this.entity.create(data);
  }
  public createMany(data: DeepPartial<T>[]): T[] {
    return this.entity.create(data);
  }

  public async getById(
    id: any,
    relations?: FindOptionsRelations<T>,
  ): Promise<T> {
    const options: FindOneOptions<T> = {
      where: { id: id },
      relations: relations,
    };
    return await this.entity.findOne(options);
  }

  public async findByCondition(filterCondition: FindOneOptions<T>): Promise<T> {
    return await this.entity.findOne(filterCondition);
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(options);
  }

  public async remove(data: T): Promise<T> {
    return await this.entity.remove(data);
  }

  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    return await this.entity.preload(entityLike);
  }

  public async startTransaction(): Promise<void> {
    this.queryRunner = this.entity.manager.connection.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  public async commitTransaction(): Promise<void> {
    if (this.queryRunner && this.queryRunner.isTransactionActive) {
      await this.queryRunner.commitTransaction();
      await this.queryRunner.release();
      this.queryRunner = null;
    }
  }

  public async rollbackTransaction(): Promise<void> {
    if (this.queryRunner && this.queryRunner.isTransactionActive) {
      await this.queryRunner.rollbackTransaction();
      await this.queryRunner.release();
      this.queryRunner = null;
    }
  }
}
