import { MinimalCoreLoop } from './CoreLoop';

export class Engine {
  private static instance: Engine | null = null;
  private coreLoop: MinimalCoreLoop;
  private initialized: boolean = false;
  private running: boolean = false;

  private constructor() {
    this.coreLoop = new MinimalCoreLoop();
  }

  static getInstance(): Engine {
    if (!Engine.instance) {
      Engine.instance = new Engine();
    }
    return Engine.instance;
  }

  initialize(): void {
    if (this.initialized) {
      return;
    }

    this.initialized = true;
  }

  start(): void {
    if (!this.initialized) {
      throw new Error('[Engine] Cannot start - engine not initialized. Call initialize() first.');
    }

    if (this.running) {
      return;
    }

    this.coreLoop.start();
    this.running = true;
  }

  stop(): void {
    if (!this.running) {
      return;
    }

    this.coreLoop.stop();
    this.running = false;
  }

  destroy(): void {
    if (this.running) {
      this.stop();
    }
    
    this.coreLoop.reset();
    this.initialized = false;
  }

  isRunning(): boolean {
    return this.running;
  }

  getTickCount(): number {
    return this.coreLoop.getTickCount();
  }
}