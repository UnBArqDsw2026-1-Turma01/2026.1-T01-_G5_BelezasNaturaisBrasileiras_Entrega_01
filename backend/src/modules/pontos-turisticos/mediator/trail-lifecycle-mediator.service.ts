import { Injectable, Logger } from '@nestjs/common';
import { ITrailLifecycleMediator, MediatorResult } from './interfaces/trail-lifecycle-mediator.interface';
import { ILifecycleHandler } from './interfaces/lifecycle-handler.interface';
import { TrailLifecycleRepository } from '../repositories/trail-lifecycle.repository';

@Injectable()
export class TrailLifecycleMediatorService implements ITrailLifecycleMediator {
  private readonly logger = new Logger(TrailLifecycleMediatorService.name);
  private handlers: { name: string; handler: ILifecycleHandler }[] = [];

  constructor(private readonly lifecycleRepo: TrailLifecycleRepository) {}

  registerHandler(name: string, handler: ILifecycleHandler) {
    this.handlers.push({ name, handler });
  }

  async finishTrail(trailId: string, actorId: string): Promise<MediatorResult> {
    const event = { trailId, actorId, timestamp: new Date().toISOString() };
    await this.lifecycleRepo.createEvent({ trailId, eventType: 'finish_started', payload: event });

    const errors: any[] = [];
    for (const h of this.handlers) {
      try {
        await h.handler.handle(event);
      } catch (e) {
        this.logger.error(`Handler ${h.name} failed`, e);
        errors.push({ handler: h.name, error: e?.message || e });
        // continue to attempt other handlers; mediator decides retry/compensation externally
      }
    }

    const status = errors.length ? 'failed' : 'completed';
    await this.lifecycleRepo.updateEventStatus(trailId, status);

    return { success: errors.length === 0, errors };
  }
}
