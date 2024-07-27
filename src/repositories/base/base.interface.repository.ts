import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsRelations,
} from 'typeorm';

export interface BaseInterfaceRepository<T> {
  create(data: DeepPartial<T>): T;
  createMany(data: DeepPartial<T>[]): T[];
  save(data: DeepPartial<T>): Promise<T>;
  saveMany(data: DeepPartial<T>[]): Promise<T[]>;
  getById(id: string, relations?: FindOptionsRelations<T>): Promise<T>;
  findByCondition(filterCondition: FindOneOptions<T>): Promise<T>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  remove(data: T): Promise<T>;
  preload(entityLike: DeepPartial<T>): Promise<T>;
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
}
