import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from '@app/repositories/base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '@app/entities/subscription.entity';

@Injectable()
export class SubscriptionRepository extends BaseAbstractRepository<Subscription> {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {
    super(subscriptionRepository);
  }
}
