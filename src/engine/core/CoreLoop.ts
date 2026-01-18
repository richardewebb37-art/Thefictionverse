import { EngineConfig } from './EngineConfig';

export class MinimalCoreLoop {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private tickCount: number = 0;

  start(): void {
    if (this.intervalId !== null) {
      return;
    }

    this.intervalId = setInterval(() => {
      this.tick();
    }, EngineConfig.TICK_RATE_MS);
  }

  stop(): void {
    if (this.intervalId === null) {
      return;
    }

    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  private tick(): void {
    this.tickCount++;
  }

  getTickCount(): number {
    return this.tickCount;
  }

  reset(): void {
    this.tickCount = 0;
  }
}